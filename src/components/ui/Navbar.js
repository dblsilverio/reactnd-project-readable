import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { categoryLoad } from '../../actions/category';

import FABook from 'react-icons/lib/fa/book';
import FANewspaper from 'react-icons/lib/fa/newspaper-o';

import Client from '../../client/ReadAPI';

class Navbar extends Component {

    async componentDidMount() {

        const { categories, dispatch } = this.props;

        if (categories.length === 0) {
            const categories = await new Client().categories();
            dispatch(categoryLoad(categories));
        }

    }

    render() {

        const { categories } = this.props;

        return (

            <nav className="navbar navbar-expand-md bg-primary navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><FABook /><b>&nbsp;Readable</b></Link>
                    <Link className="btn btn-default navbar-btn btn-primary text-white" to="/">Home</Link>
                    <div className="btn-group">
                        <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown"> Categories </button>
                        <div className="dropdown-menu">
                            {categories.map(category => (
                                <Link className="dropdown-item" key={category.path} to={`/${category.name}`}>{category.name}</Link>
                            ))}
                        </div>
                    </div>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                    <div className="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
                        <ul className="navbar-nav"></ul>
                        <Link className="btn navbar-btn ml-2 text-white btn-primary" to="/new"><FANewspaper />&nbsp;New Post</Link>
                    </div>
                </div>
            </nav>

        );
    }

}

function mapStateToProps({ category }) {
    const { categories } = category;
    return {
        categories
    };
}

export default connect(mapStateToProps)(Navbar);