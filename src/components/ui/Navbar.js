import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { categoryLoad } from '../../actions/category';

import FABook from 'react-icons/lib/fa/book';
import FANewspaper from 'react-icons/lib/fa/newspaper-o';

import Client from '../../client/ReadAPI';

class Navbar extends Component {

    async componentDidMount() {

        if (this.props.categories.length === 0) {
            const categories = await new Client().categories();
            this.props.dispatch(categoryLoad(categories));
        }

    }

    render() {
        console.log(this.props.categories);
        return (

            <nav className="navbar navbar-expand-md bg-primary navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><FABook /><b>&nbsp;Leitura</b></Link>
                    <Link className="btn btn-default navbar-btn btn-primary text-white" to="/">Home</Link>
                    <div className="btn-group">
                        <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown"> Categories </button>
                        <div className="dropdown-menu">
                            {this.props.categories.map(category => (
                                <Link className="dropdown-item" key={category.path} to={`/categoria/${category.name}`}>{category.name}</Link>
                            ))}
                        </div>
                    </div>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                    <div className="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
                        <ul className="navbar-nav"></ul>
                        <Link className="btn navbar-btn ml-2 text-white btn-primary" to="/novo"><FANewspaper />&nbsp;New Post</Link>
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