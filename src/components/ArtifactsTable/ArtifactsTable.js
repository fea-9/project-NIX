import React, { Component } from 'react';
import sortFunc from "../../utils/sortFunc.js";
import varyDateView from "../../utils/varyDateView.js";
import findLastDate from "../../utils/findLastDate.js";
import { Scrollbars } from 'react-custom-scrollbars';

let generateMock = quantity => {//DELETE
  let res = []
  let randomArray = () => {
    let res = []
    var i = 0
    while(i++ < Math.round(Math.random()*100))res.push(i)
    return res
  }
  for(var i = 0; i < quantity; i++){
    res.push({
      name: String.fromCharCode(Math.round(Math.random()*10000)),
      theme: "someTheme",
      publish: `01.06.${Math.round(Math.random()*2000)}`,
      contributors: randomArray(),
      keyWords: randomArray(),
      totalCitation: Math.round(Math.random()*1000),
      proof: Math.random() < 0.5
    })
  }
  return res
}

let mock2 = generateMock(1200)//DELETE

let ArrowIcon = p => (
	<div className="table-arrow" onClick={p.click}
		style={{color: p.check ? "blue" : "black"}}
	>
		{p.direct ? "V" : "^"}
	</div>
)//DELETE

class ArtifactsTable extends Component {
	state = {
		data:[],
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
			},
		]
	}


	clickSortHandler = indic => event => {
		let nInd = this.state.indicators.map(elem => {
			if(elem.name === indic.name){
				elem.check = true
				elem.direction = !elem.direction
			} else {
				elem.check = false
				elem.direction = false
			}
			return elem
		})
		this.setState({data: sortFunc(this.state.data, indic.key, indic.direction), indicators: nInd})
	}
	componentDidMount(){
		this.setState({data: mock2})
	}
	render(){
		let s = this.state
		return(
			<div className = "artifacts-table">
				<div className = "artifacts-table__info">
          You have { s.data.reduce((prev, el) => ++prev,0) } artifacts
          <div className = "artifacts-table__info__dop">
            Last update {
              !s.data.length ? 0 : varyDateView(
                findLastDate(
                  s.data.map(el => el.publish)
                )
              )
            }
          </div>
        </div>
				<div className = "artifacts-table__indikators">
					{s.indicators.map((elem, index) => (
						<div className = {
								`artifacts-table__indikators__item__${elem.name.split(" ").join("-").toLowerCase()}`
						}>
							{elem.name}
							<ArrowIcon
								click={this.clickSortHandler(elem)}
								direct={elem.direction}
								check={elem.check}/>
						</div>
					))}
				</div>
				<div className = "artifacts-table__main">
          <Scrollbars >
  					{!s.data.length ? "spiner..." : s.data.map((elem, index) => (
  						<div className = "artifacts-table__main__line">
  							<div className = "artifacts-table__main__line__artfs">
  								{elem.name}
                  <div className = "artifacts-table__main__line__artfs__dop">
                      {`${elem.theme}, ${elem.publish.split(".")[2]}`}
                  </div>
  							</div>
  							<div className = "artifacts-table__main__line__contr">
  								{elem.contributors.join(", ")}
  							</div>
  							<div className = "artifacts-table__main__line__keyw">
  								{elem.keyWords.length <= 3 ?
  									elem.keyWords.map((el,ind) => <span>{el}</span>)
  									: elem.keyWords.filter((el, ind) => ind < 3)
  												   .map((el,inx)=> <span>{el}</span>)
  								}
  								{elem.keyWords.length > 3 ? <span>...</span> : false}
  							</div>
  							<div className = "artifacts-table__main__line__cit">
  								{elem.totalCitation}
  							</div>
  							<div className = "artifacts-table__main__line__prof">
  								{elem.proof.toString()}
  							</div>
  						</div>
  					))}
          </Scrollbars>
				</div>
			</div>
		)
	}
}

export default ArtifactsTable
