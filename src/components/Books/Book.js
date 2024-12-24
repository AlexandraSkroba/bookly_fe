import React, { Component } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import API_ENDPOINTS from "../../apiConfig";
import axios from "axios";
import { FormErrors } from "../../components/FormErrors/FormErrors";
import { InputField } from "../../components/InputField";

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
    this.state = {
      book: null,
      isOwner: false,
      title: '',
      author: '',
      genre: '',
      language: '',
      condition: '',
      country: '',
      city: '',
      exchangeState: '',
      owner: '',
      errors: [],
      notFound: false 
    };
  }

  async componentDidMount() {
    const id = this.props.id;
    await this.fetchBook(id);
  }

  fetchBook = async (id) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.getBooks}/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
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

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitEvent = (e) => {
    e.preventDefault();
    const { title, author, genre, language, condition, country, city, exchangeState, owner, isOwner } = this.state;

    const errors = [];
    if (!title) errors.push("Title is required.");
    if (!author) errors.push("Author is required.");

    if (errors.length > 0) {
      this.setState({ errors });
    }
  };

  render() {
    const { title, author, genre, language, condition, country, city, exchangeState, owner, errors, isOwner, notFound } = this.state;

    if (notFound) {
      return <Navigate to="/not-found" />;
    }

    return (
      <form onSubmit={this.handleSubmitEvent}>
        <FormErrors errors={errors} />
        <div className="row">
          <InputField
            id="title"
            name="title"
            value={title}
            label="Title"
            onChange={this.handleChange}
            disabled={!isOwner}
          />
          <InputField
            id="author"
            name="author"
            value={author}
            label="Author"
            onChange={this.handleChange}
            disabled={!isOwner}
          />
          <InputField
            id="genre"
            name="genre"
            value={genre}
            label="Genre"
            onChange={this.handleChange}
            disabled={!isOwner}
          />
          <InputField
            id="language"
            name="language"
            value={language}
            label="Language"
            onChange={this.handleChange}
            disabled={!isOwner}
          />
        </div>
        <div className="row">
          <div className="col-sm-3">
            <div className="form-group">
              <label htmlFor="condition" className="col-form-label">Condition</label>
              <select id="condition" name="condition" value={condition} onChange={this.handleChange} className="form-control">
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
            disabled={!isOwner}
          />
          <InputField
            id="city"
            name="city"
            value={city}
            label="City"
            onChange={this.handleChange}
            disabled={!isOwner}
          />
          <InputField
            id="exchangeState"
            name="exchangeState"
            value={exchangeState}
            label="exchange State"
            onChange={this.handleChange}
            disabled={true}
          />
        </div>
        <div class="row mt-5">
          <div className="col-sm-3">
            <Link to={`/users/${ owner.id }`} className="btn btn-warning">OWNER LINK({owner.username})</Link>
          </div>
        </div>
      </form>
    );
  }
}
