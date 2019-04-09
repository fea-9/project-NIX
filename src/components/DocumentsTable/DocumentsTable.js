import React, { Component } from "react";
import sortFunc from "../../utils/sortFunc.js";
import varyDateView from "../../utils/varyDateView.js";
import findLastDate from "../../utils/findLastDate.js";
import { Scrollbars } from "react-custom-scrollbars";
import DocCard from "../DocCard/DocCard";
//test icons
import ArrowIcon from "./ArrowIcon";
import TestSpiner from "./TestSpiner";

let generateMock = quantity => {
  //DELETE
  let res = [];
  let randomArray = () => {
    let res = [];
    var i = 0;
    while (i++ < Math.round(Math.random() * 100)) res.push(i + "0000");
    return res;
  };
  for (var i = 0; i < quantity; i++) {
    res.push({
      documentId: i,
      documentTitle: String.fromCharCode(Math.round(Math.random() * 10000)),
      documentSource: "Pediatric Rheumatology, 2017",
      documentContributors: randomArray(),
      documentKeywords: randomArray(),
      documentCitations: Math.round(Math.random() * 1000),
      documentProof: {
        modifiedDate: new Date().getTime() - Math.round(Math.random()*1000)
      }
    });
  }
  return {
    totalCount: 345,
    modifiedDate: new Date().getTime(),
    documentslist: res
  };
};

let mock = generateMock(12);

class DocumentsTable extends Component {
  state = {
    data: null,
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
    let nData = JSON.parse(JSON.stringify(this.state.data))
    nData.documentslist = sortFunc(
      this.state.data.documentslist,
      indic.key,
      indic.direction,
      "modifiedDate"
    )
    this.setState({
      data: nData ,
      indicators: nInd
    });
  };

  componentDidMount() {
    this.setState({ data: mock });
  }

  render() {
    let s = this.state;
    if(s.data === null) return (<TestSpiner full={true}/>)
    console.log(s.data)
    return (
      <div className="documents">
        <div className="documents-info">
          You have {s.data.totalCount} documents
          <div className="documents-info__dop">
            Last update {varyDateView(s.data.modifiedDate)}
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
              <ArrowIcon
                click={this.clickSortHandler(elem)}
                direct={elem.direction}
                check={elem.check}
              />
            </div>
          ))}
        </div>
        <div className="documents__main">
          <Scrollbars>
            {
              s.data.documentslist.map((elem, index) => (
                <DocCard
                  key={index}
                  title={elem.documentTitle}
                  theme={elem.documentSource}
                  contributors={elem.documentContributors.join(", ")}
                  keyWords={elem.documentKeywords}
                  totalCitation={elem.documentCitations}
                />
              ))
            }
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default DocumentsTable;
