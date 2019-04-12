import React, { Component } from "react";
import sortFunc from "../../utils/sortFunc.js";
import varyDateView from "../../utils/varyDateView.js";
import { Scrollbars } from "react-custom-scrollbars";
import DocCard from "../DocCard/DocCard";
import * as actions from "../actions/documents";
import { connect } from "react-redux";
import Spinner from "../Spinner/Spinner";
import Icon from "../BaseComponents/icon/index";
import Button from "../BaseComponents/Button";
import Error from "../Error/Error"

let mapStateToProps = state => ({
  documents: state.documents,
  token: state.auth.user.access_token
});

class DocumentsTable extends Component {
  state = {
    indicators: [
      {
        name: "ARTIFACTS",
        key: "documentTitle",
        check: false,
        direction: false
      },
      {
        name: "CONTRIBUTORS",
        key: "documentContributors",
        check: false,
        direction: false
      },
      {
        name: "KEYWORDS",
        key: "documentKeywords",
        check: false,
        direction: false
      },
      {
        name: "TOTAL CITATIONS",
        key: "documentCitations",
        check: false,
        direction: false
      },
      {
        name: "PROOF OF EXISTENCE",
        key: "documentProof",
        check: false,
        direction: false
      }
    ]
  };

  clickSortHandler = indic => event => {
    let nInd = this.state.indicators.map(elem => {
      if (elem.name === indic.name) {
        elem.check = true;
        elem.direction = !elem.direction;
      } else {
        elem.check = false;
        elem.direction = false;
      }
      return elem;
    });
    let nData = JSON.parse(JSON.stringify(this.props.documents.data.data));
    nData.documentslist = sortFunc(
      this.props.documents.data.data.documentslist,
      indic.key,
      indic.direction,
      "modifiedDate"
    );
    this.setState({
      indicators: nInd
    });
    this.props.setData(nData);
  };

  componentDidMount() {
    let token = localStorage.getItem("access_token");
    this.props.documentsRequest(token);
  }

  render() {
    let s = this.state;
    let p = this.props;
    if (p.documents.initial || p.documents.isFetching)
      return <Spinner procent={true} />;
    if (p.documents.error) return <Error />;
    return (
      <div className="documents">
        <div className="documents-info">
          You have {p.documents.data.totalCount} documents
          <div className="documents-info__dop">
            Last update {varyDateView(p.documents.data.data.modifiedDate)}
          </div>
        </div>
        <div className="indikators">
          {s.indicators.map((elem, index) => (
            <div
              style={{ color: elem.check ? "#7b8180" : "#cad5da" }}
              className={`indikators__item__${elem.name
                .split(" ")
                .join("-")
                .toLowerCase()}`}
              key={index}
            >
              {elem.name}
              {elem.direction ? (
                <Button onClick={this.clickSortHandler(elem)}>
                  <Icon
                    type="arrowUpIcon"
                    className="arrow-icon"
                    viewBox="0 0 10 6"
                    width={10}
                    height={6}
                  />
                </Button>
              ) : (
                <Button onClick={this.clickSortHandler(elem)}>
                  <Icon 
                    type="arrowDownIcon" 
                    className="arrow-icon"
                    viewBox="0 0 10 6" 
                    width={10}
                    height={6}
                  />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="documents__main">
          <Scrollbars>
            {p.documents.data.data.documentslist.map((elem, index, arr) => (
              <DocCard
                data={p.documents.data.data}
                ind={index}
                key={index}
                title={elem.documentTitle}
                theme={elem.documentSource}
                contributors={elem.documentContributors.join(", ")}
                keyWords={elem.documentKeywords}
                totalCitation={elem.documentCitations}
                documentProof={elem.documentProof || false}
              />
            ))}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

DocumentsTable = connect(
  mapStateToProps,
  { ...actions }
)(DocumentsTable);

export default DocumentsTable;
