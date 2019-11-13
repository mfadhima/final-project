import React, {Component} from 'react'
import Axios from 'axios'
import ProductItem from '../ProductItem'
import '../styles/AllProducts.css'

const URL_API = 'http://localhost:8888/'

class AllProduct extends Component {
    state = {
        products: [],
        searchProducts: [],
        searchByNameInput: '',
        minimumPrice: -Infinity,
        maximumPrice: Infinity
    }

    componentDidMount() {
        this.getProductData()
    }

    getProductData = () => {
        Axios.get(
            URL_API + 'products/productbrodo'
        ).then((res) => {
            this.setState({
                products: res.data,
                searchProducts: res.data,
                searchByNameInput: ''
            })
            // console.log(this.state)
        }).catch((err) => {
            console.log(err)
        })
    }

    onSearchByName = () => {
        let searchByName = this.state.products.filter((val) => {
            return(
                val.name.toLowerCase().includes(this.state.searchByNameInput.toLowerCase())
            )
        })
        this.setState({searchProducts: searchByName})
    }

    onSearchByPrice = () => {
        let searchByPrice = this.state.products.filter((val) => {
            return(
                val.price >= this.state.minimumPrice && val.price <= this.state.maximumPrice
            )
        })
        this.setState({searchProducts: searchByPrice})
    }

    renderProductData = () => {
        return this.state.searchProducts.map((val) => {
            return <ProductItem product={val} key={val.id}/>
        })
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-4 mt-3">
                        <h2>Filter Product</h2> <hr/>
                        <div className="card-ku">
                            <div className="mx-3 my-3">
                                <div className="card-title mt-3">
                                    <h5>Search by name</h5> <hr/>
                                </div>
                                <input onChange={(e) => {this.setState({searchByNameInput: e.target.value})}} className="form-control mb-3" type="text"/>
                                <button onClick={this.onSearchByName} className="button-ku">Search</button>
                            </div>
                        </div>
                        <div className="card-ku mt-5">
                            <div className="mx-3 my-3">
                                <div className="card-title mt-3">
                                    <h5>Search by Price</h5> <hr/>
                                </div>
                                <input onChange={(e) => {this.setState({minimumPrice: e.target.value})}} placeholder="Minimum Price" className="form-control" type="text"/>
                                <input onChange={(e) => {this.setState({maximumPrice: e.target.value})}} placeholder="Maximum Price" className="form-control mb-3" type="text"/>
                                <button onClick={this.onSearchByPrice} className="button-ku">Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="row">
                            {this.renderProductData()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AllProduct