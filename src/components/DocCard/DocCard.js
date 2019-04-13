import React from "react";
import ThreePointIcon from "../DocumentsTable/ThreePointIcon";
import Button from "../BaseComponents/Button";
import varyDateView from "../../utils/varyDateView.js";
import Icon from "../BaseComponents/icon/index";
import PropTypes from "prop-types";

import * as actions from "../actions/documents";
import { connect } from "react-redux";

let DocCard =  p => {
  let mob = p.mobile ? "-mobile" : "";
  let addProof = () => {
    let nData = JSON.parse(JSON.stringify(p.data))
    nData.documentslist.map((el, ind) => {
      if(ind === p.ind){
        el.documentProof = {}
        el.documentProof.modifiedDate = new Date().getTime()
      }
      return el
    })
    p.setData(nData)
  }
  let delProof = () => {
    let nData = JSON.parse(JSON.stringify(p.data))
    nData.documentslist.map((el, ind) => {
      if(ind === p.ind){
        delete el.documentProof 
      }
      return el
    })
    p.setData(nData)
  }
  return (
    <div className={`doc-line${mob}`}>
      <div className={`doc-line-artfs${mob}` }>
        {p.title}
        <div className={`doc-line-artfs${mob}__dop`}>{p.theme}</div>
      </div>
      <div className={`doc-line-contr${mob}`}>{p.contributors}</div>
      <div className={`doc-line-keyw${mob}`}>
        {p.keyWords.length <= 3
          ? p.keyWords.map((el, ind) => <span key={ind}>{el}</span>)
          : p.keyWords
              .filter((el, ind) => ind < 3)
              .map((el, inx) => <span key={inx + el}>{el}</span>)}
        {p.keyWords.length > 3 ? (
          <ThreePointIcon data={p.keyWords.filter((el, index) => index >= 3)} />
        ) : (
          false
        )}
      </div>
      <div className={`doc-line-cit${mob}`}>{p.totalCitation}</div>
      <div className={`doc-line-prof${mob}`}>
        {p.documentProof ? (
            <div onClick={delProof} className={`doc-line-transact${mob}`}>
                <Icon type="chekedIcon" className='checked-icon' width={20} height={12} viewBox="0 0 20 12"/>
                 <span>Hash</span>
                <div className={`doc-line-artfs${mob}__dop`}>
                    {varyDateView(p.documentProof.modifiedDate)}
                </div>
            </div>
        ) : (
          <Button onClick = {addProof} children="Transact" className="btn-documents" />
        )}
      </div>
    </div>
  );
};

DocCard.propTypes = {
  data: PropTypes.object,
  mobile: PropTypes.bool,
  ind: PropTypes.number,
  key: PropTypes.number,
  title: PropTypes.string,
  theme: PropTypes.string,
  contributors: PropTypes.string,
  keyWords: PropTypes.array,
  totalCitation: PropTypes.number,
  documentProof: PropTypes.any
}

DocCard = connect(null, {...actions})(DocCard)

export default DocCard
