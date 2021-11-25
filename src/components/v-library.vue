<template>
  <div class="container">
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
          <h1>Books</h1>
          <hr>
          <br><br>
          <alert :message=message v-if="showMessage"></alert>
          <button type="button" class="btn btn-success btn-sm" @click="toAddBook()">Add Book</button>
          <br><br>
          <table class="table table-hover">
            <thead>
            <tr>
              <th scope="col"> id</th>
              <th scope="col">Title</th>
              <th scope="col">Page No</th>
              <th scope="col">Author</th>
              <th scope="col">Genre</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(book,index) in LIBRARY" :key="index">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.pageCount }}</td>
              <td>{{
                  book.authors.map((author) => {
                    return author.name + " " + author.surname;
                  }).join(", ")
                }}
              </td>
              <td>{{ book.genre.genreName }}</td>
              <td>
                <button type="button"
                        class="btn btn-warning btn-sm"
                        v-b-modal.book-update-modal
                        @click="editBook(book)">
                  Update
                </button>
                <button type="button" class="btn btn-danger btn-sm" @click="DELETE_BOOK_FROM_API(book.id, index)">
                  Delete
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <b-modal ref="editBookModal"
             id="book-update-modal"
             title="Update"
             hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
        <b-form-group id="form-title-edit-group"
                      label="Title:"
                      label-for="form-title-edit-input">
          <b-form-input id="form-title-edit-input"
                        type="text"
                        v-model="editForm.title"
                        required
                        placeholder="Enter title">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-pages-edit-group"
                      label="Pages:"
                      label-for="form-pages-edit-input">
          <b-form-input id="form-pages-edit-input"
                        type="number"
                        v-model="editForm.pageCount"
                        required
                        placeholder="Enter pages">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-author-edit-group"
                      v-for="(author,index) in editForm.authorList" :key="index"
                      label="Author:"
                      label-for="form-author-edit-input">
          <b-form-select
              id="bookAuthor"
              class="form-control"
              v-model="author.id"
              :options=options
          >
          </b-form-select>
        </b-form-group>


        <b-form-group id="form-genre-edit-group"
                      label="Genre:"
                      label-for="form-genre-edit-input">
          <b-form-select
              id="bookGenre"
              class="form-control"
              v-model="editForm.genre.id"
              :options=optionsGenre
          >
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Update</b-button>
        <b-button type="reset" variant="danger">Cancel</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Alert from './Alert.vue';

export default {
  components: {
    alert: Alert,
  },
  name: "v-library",
  computed: {
    ...mapGetters([
      'LIBRARY',
      'GENRES',
      'AUTHORS'
    ])
  },
  methods: {
    ...mapActions([
      'GET_LIBRARY_FROM_API',
      'DELETE_BOOK_FROM_API',
      'GET_GENRES_FROM_API',
      'GET_AUTHORS_FROM_API',
      'GET_LIBRARY_FROM_API',
      'UPDATE_BOOK_FROM_API'

    ]),
    toAddBook() {
      this.$router.push({name: 'addBook'})
    },
    editBook(book) {
      this.editForm.id = book.id;
      this.editForm.authorList = book.authors;
      this.editForm.title = book.title;
      this.editForm.genre = book.genre;
      this.editForm.pageCount = book.pageCount;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editBookModal.hide();
      console.log(this.editForm.authorList);
      this.UPDATE_BOOK_FROM_API(this.editForm);
      this.refreshData()
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editBookModal.hide();
      this.initForm();
      this.refreshData()
    },
    initForm() {
      this.editForm.id = '';
      this.editForm.title = '';
      this.editForm.authorList = [];
      this.editForm.pageCount = '';
      this.editForm.genre = {};
    },
    getOptions() {
      let arr = this.AUTHORS;
      this.options = [];
      arr.forEach(el => {
        let auth = el.surname + " " + el.name;
        this.options.push({
          text: auth,
          value: el.id
        });
      });
      this.optionsGenre = [];
      let arrGenre = this.GENRES;
      arrGenre.forEach(el => {
        this.optionsGenre.push({
          text: el.genreName,
          value: el.id
        })
      });
    },
    refreshData() {
      this.GET_LIBRARY_FROM_API();
      this.GET_GENRES_FROM_API();
      this.GET_AUTHORS_FROM_API();
      this.getOptions();
    }
  },

  mounted() {
    this.GET_LIBRARY_FROM_API();
    this.GET_GENRES_FROM_API();
    this.GET_AUTHORS_FROM_API();
    this.getOptions();
  },
  data() {
    return {
      message: '',
      showMessage: false,
      editForm: {
        id: '',
        title: '',
        pageCount: '',
        authorList: [],
        genre: {}
      },
      options: [],
      optionsGenre: []
    }
  }
}
</script>

<style scoped>

</style>