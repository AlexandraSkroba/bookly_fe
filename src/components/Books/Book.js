import React, { Component } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import API_ENDPOINTS, { defaultHeaders } from "../../apiConfig";
import axios from "axios";
import { FormErrors } from "../FormErrors/FormErrors";
import { InputField } from "../InputField";
import { RatingsList } from "../Ratings/RatingsList";

export const BookWrapper = () => {
  const location = useLocation();
  const id = parseInt(location.pathname.split('/')[2]);

  return (
    <>
      <Book id={id} />
    </>
  )
}

export class Book extends Component {
  constructor(props) {
    super(props);
    this.isNew = props.isNew;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.state = {
      book: null,
      ratings: [],
      isOwner: false,
      title: '',
      author: '',
      genre: '',
      language: '',
      condition: 'new',
      country: '',
      city: '',
      exchangeState: '',
      owner: '',
      errors: [],
      notFound: false,
      reviewed: true 
    };
  }

  async componentDidMount() {
    const id = this.props.id;
    if (!this.isNew) {
      await this.fetchBook(id);
      await this.fetchRatings(id)
    }
  }

  fetchBook = async (id) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.getBooks}/${id}`, {
        headers: defaultHeaders
      });
      const book = response.data.book;
      this.setState({
        book,
        isOwner: response.data.isOwner,
        title: book?.title || '',
        author: book?.author || '',
        genre: book?.genre || '',
        language: book?.language || '',
        condition: book?.condition || '',
        country: book?.country || '',
        city: book?.city || '',
        exchangeState: book?.exchangeState || '',
        owner: book?.owner || ''
      });
    } catch (e) {
      this.setState({ notFound: true }); 
    }
  };

  fetchRatings = async (id) => {
    try {
      const response = await axios.get(API_ENDPOINTS.ratings + `/book/${id}`, { headers: defaultHeaders });
      this.setState({ ratings: response.data });
      console.log(response.data);
      this.setState({ reviewed: !!response.data.filter(rating => rating.owner.id === this.currentUser.id).length })
    } catch(e) {
      console.log(e)
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitEvent = async (e) => {
    e.preventDefault();
    const { book, title, author, genre, language, condition, country, city } = this.state;

    const errors = [];
    if (!title) errors.push("Title is required.");
    if (!author) errors.push("Author is required.");

    if (errors.length > 0) {
      this.setState({ errors });
    }
  
    const data = {
      title, author, genre, language, condition, country, city
    }

    try {
      await axios.put(`${API_ENDPOINTS.getBooks}/${book.id}`, data, { headers: defaultHeaders })
      window.location.reload()
    } catch(e) {
      this.setState({errors: e.response.data.message})
    }
  };

  handleCreate = async (e) => {
    e.preventDefault();
    const { title, author, genre, language, condition, country, city } = this.state;

    const data = {
      title, author, genre, language, condition, country, city
    }

    try {
      const response = await axios.post(`${API_ENDPOINTS.getBooks}`, data, { headers: defaultHeaders })
      window.location.href = '/books'
    } catch(e) {
      this.setState({ errors: e.response.data.message })
    }
  }

  deleteBook = async (e) => {
    const { book } = this.state;
    try {
      const response = await axios.delete(`${API_ENDPOINTS.getBooks}/${book.id}`, { headers: defaultHeaders })
    } catch(e) {
      this.setState({ errors: e.response.data.message })
    }
  }

  makeAvailable = async (e) => {
    const { book } = this.state;
    try {
      const response = await axios.get(API_ENDPOINTS.makeAvailable.replace(':id', book.id), { headers: defaultHeaders })
      this.resetForm()
    } catch(e) {
      this.setState({ errors: e.response.data.message })
    }
  }

  resetForm = (e) => {
    window.location.reload()
  }

  quitForm() {
    window.history.back()
  }

  render() {
    const {book, ratings, title, author, genre, language, condition, country, city, exchangeState, owner, errors, isOwner, notFound, reviewed } = this.state;
    const disabled = !isOwner && !this.isNew;

    if (notFound) {
      return <Navigate to="/not-found" />;
    }

    return (
      <>
        { this.isNew && (<div className="row h4 m-2">Create new book</div>) }
        <form onSubmit={this.isNew ? this.handleCreate : this.handleSubmitEvent}>
          <div className="row mb-5">
            <div className="col-sm-3">
              { !this.isNew && (<><span>Owner link:</span> <Link to={`/users/${ owner.id }`} className="btn">{owner.username}</Link></>)}
            </div>
          </div>
          <FormErrors errors={errors} />
          <div className="row">
            <InputField
              id="title"
              name="title"
              value={title}
              label="Title"
              onChange={this.handleChange}
              disabled={disabled}
            />
            <InputField
              id="author"
              name="author"
              value={author}
              label="Author"
              onChange={this.handleChange}
              disabled={disabled}
            />
            <InputField
              id="genre"
              name="genre"
              value={genre}
              label="Genre"
              onChange={this.handleChange}
              disabled={disabled}
            />
            <InputField
              id="language"
              name="language"
              value={language}
              label="Language"
              onChange={this.handleChange}
              disabled={disabled}
            />
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="form-group">
                <label htmlFor="condition" className="col-form-label">Condition</label>
                <select id="condition" name="condition" value={condition} onChange={this.handleChange} disabled={disabled} className="form-control">
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="damaged">Damaged</option>
                </select>
              </div>
            </div>
            <InputField
              id="country"
              name="country"
              value={country}
              label="Country"
              onChange={this.handleChange}
              disabled={disabled}
            />
            <InputField
              id="city"
              name="city"
              value={city}
              label="City"
              onChange={this.handleChange}
              disabled={disabled}
            />
            { !this.isNew &&
              (
              <InputField
                id="exchangeState"
                name="exchangeState"
                value={exchangeState}
                label="exchange State"
                onChange={this.handleChange}
                disabled={true}
              />
              )
            }
          </div>
          <div className="row mt-1">
            { !this.isNew ? (
              <>
                { ((exchangeState === 'available') && !isOwner) && (
                  <>
                    <div className="col-sm-1">
                      <Link to={`/exchanges/new?bookId=${book.id}`} params={{isNew: true}} className="btn btn-warning">Request exchange</Link>
                    </div>
                  </>
                ) }
                { isOwner && (
                  <>
                    <div className="col-sm-1">
                      <input type="submit" className="btn btn-success" value="Save" />
                    </div>
                    <div className="col-sm-1">
                      <div className="btn btn-secondary" onClick={this.resetForm}>Reset</div>
                    </div>
                    <div className="col-sm-10 d-flex flex-row-reverse">
                      { exchangeState === 'exchanged' && (
                        <>
                          <div className="btn btn-secondary" onClick={this.makeAvailable}>Make available</div>
                        </>
                      ) }
                      { (exchangeState === 'exchanged' || exchangeState === 'available') && (
                        <>
                          <button className="btn btn-danger" onClick={this.deleteBook}>Delete</button>
                        </>
                        )
                      }
                    </div>
                  </>
                  )
                }
                { !reviewed && (
                  <>
                    <div className="col-sm-1 mt-3">
                      <Link to={`/ratings/new?entity=book&entityId=${book.id}`} className="btn btn-info">Review</Link>
                    </div>
                  </>
                )}
              </>) : (
                <>
                  <div className="col-sm-1">
                    <input type="submit" className="btn btn-success" value="Create" />
                  </div>
                  <div className="col-sm-1">
                    <div className="btn btn-secondary" onClick={this.quitForm}>Cancel</div>
                  </div>
                </>
              )
            }
          </div>
        </form>
        <hr />
        <RatingsList ratings={ratings} />
      </>
    );
  }
}
