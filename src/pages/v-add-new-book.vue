<template>
  <div class="container v-add-new-book">
    <form @submit="onSubmitInsert">
      <div class="form-group">
        <label for="bookTitle">Book title</label>
        <input type="text"
               class="form-control"
               id="bookTitle"
               v-model="insertedBook.title"
               placeholder="Enter title">
      </div>
      <div>
          <label for="bookGenre">Book genre</label>
          <select id="bookGenre" class="form-control" v-model="insertedBook.genre">
            <option v-for="genre in GENRES" :key="genre.id" :value="genre">{{ genre.genreName }}</option>
          </select>
      </div>
      <div>
        <label for="bookAuthor">Book genre</label>
        <select id="bookAuthor" class="form-control" v-model="insertedBook.authors">
          <option v-for="author in AUTHORS" :key="author.id" :value="author">{{author.surname +" " + author.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="bookPages">Pages </label>
        <input type="number"
               class="form-control"
               id="bookPages"
               v-model="insertedBook.pageCount"
               placeholder="Enter book pages">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "v-add-new-book",
  computed: {
    ...mapGetters([
      'LIBRARY',
      'GENRES',
      'AUTHORS'
    ])
  },
  methods: {
    ...mapActions([
      'INSERT_BOOK_FROM_API',
      'GET_GENRES_FROM_API',
      'GET_AUTHORS_FROM_API',
      'GET_LIBRARY_FROM_API'
    ]),

    onSubmitInsert() {
      let book = {
        id: '',
        title: this.insertedBook.title,
        pageCount: this.insertedBook.pageCount,
        authorList: [this.insertedBook.authors],
        genre: this.insertedBook.genre
      }

      this.INSERT_BOOK_FROM_API(book)
      this.GET_LIBRARY_FROM_API()
      this.$router.push({name:'Library'})
    }
  },
  data() {
    return {
      insertedBook: {
        id: '0',
        title: '',
        pageCount: '',
        authors: [],
        genre: {}
      }
    }
  },
  mounted() {
    this.GET_GENRES_FROM_API()
        .then((response) => {
          if (response.data) {
            console.log(response.data);
          }
        });
    this.GET_AUTHORS_FROM_API();
  }
}
</script>

<style scoped>

</style>