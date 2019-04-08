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
      name: String.fromCharCode(Math.round(Math.random() * 10000)),
      theme: "someTheme",
      publish: `01.06.${Math.round(Math.random() * 2000)}`,
      contributors: randomArray(),
      keyWords: randomArray(),
      totalCitation: Math.round(Math.random() * 1000),
      proof: Math.random() < 0.5
    });
  }
  return res;
};

let mock = generateMock(12);

class DocumentsTable extends Component {
  state = {
    data: [],
    indicators: [
      {
        name: "ARTIFACTS",
        key: "name",
        check: false,
        direction: false
      },
      {
        name: "CONTRIBUTORS",
        key: "contributors",
        check: false,
        direction: false
      },
      {
        name: "KEYWORDS",
        key: "keyWords",
        check: false,
        direction: false
      },
      {
        name: "TOTAL CITATIONS",
        key: "totalCitation",
        check: false,
        direction: false
      },
      {
        name: "PROOF OF EXISTENCE",
        key: "proof",
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
    this.setState({
      data: sortFunc(this.state.data, indic.key, indic.direction),
      indicators: nInd
    });
	};
	
  componentDidMount() {
    this.setState({ data: mock });
	}
	
  render() {
    let s = this.state;
    return (
      <div className="documents">
        <div className="documents-info">
          You have {s.data.reduce((prev, el) => ++prev, 0)} documents
          <div className="documents-info__dop">
            Last update{" "}
            {!s.data.length
              ? 0
              : varyDateView(findLastDate(s.data.map(el => el.publish)))}
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
            {!s.data.length ? (
              <TestSpiner full={true} />
            ) : (
              s.data.map((elem, index) => (
                <DocCard
									key= {index}
                  title={elem.name}
                  theme={elem.theme}
                  publish={elem.publish.split(".")[2]}
                  contributors={elem.contributors.join(", ")}
                  keyWords={elem.keyWords}
                  totalCitation={elem.totalCitation}
                />
              ))
            )}
          </Scrollbars>
        </div>
      </div>
    );
  }
}

export default DocumentsTable;
