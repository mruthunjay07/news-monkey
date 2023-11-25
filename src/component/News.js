import React, { Component } from "react";
import NewsItem from "../NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.props.category}-NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(0)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.props.setProgress(70)
    console.log("component did mount", parsedData);

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
      // totalResults : 0
    });
    this.props.setProgress(100)

  }
  async componentDidMount() {
    // console.log('props recieved', this.props);
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=51d191f5c4ab475ea1d26ee9f68e4eeb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading : true})
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log('component did mount', parsedData);

    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading : false
    // });
    // console.log('state', this.state);
    console.log('apikey', this.props.apiKey);
    this.updateNews();
  }

  handlePrevClick = async () => {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey51d191f5c4ab475ea1d26ee9f68e4eeb&page=${
    //     this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`;
    //   this.setState({loading : true})
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    //   console.log(parsedData);

    //   this.setState({
    //     page: this.state.page - 1,
    //     articles: parsedData.articles,
    //     loading : false
    //   });
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  handleNextClick = async () => {
    // if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey51d191f5c4ab475ea1d26ee9f68e4eeb&page=${
    //       this.state.page + 1
    //     }&pageSize=${this.props.pageSize}`;
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();

    //     this.setState({
    //       page: this.state.page + 1,
    //       articles: parsedData.articles,
    //       loading : false
    // });
    // }
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  fetchMoreData = async() => {
   this.setState({page:this.state.page+1})
   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    }
    )};

    
  

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px 0px" }}>
          NewsMonkey - Top Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
        <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
                
              );
            })}
          </div>
          </div>
        </InfiniteScroll>
        
      </div>
    );
  }
}

export default News;
