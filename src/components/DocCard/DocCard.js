
import React from "react";
import ThreePointIcon from "../DocumentsTable/ThreePointIcon";
import Button from "../BaseComponents/Button";
import varyDateView from "../../utils/varyDateView.js";
import Icon from "../BaseComponents/icon/index";

import * as actions from "../actions/documents";
import { connect } from "react-redux";

let DocCard =  p => {
  let currentClass = p.vertical ? "doc-colmun" : "doc-line";
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
    <div className={currentClass}>
      <div className={`${currentClass}-artfs`}>
        {p.title}
        <div className={`${currentClass}-artfs__dop`}>{p.theme}</div>
      </div>
      <div className={`${currentClass}-contr`}>{p.contributors}</div>
      <div className={`${currentClass}-keyw`}>
        {p.keyWords.length <= 3
          ? p.keyWords.map((el, ind) => <span key={ind}>{el}</span>)
          : p.keyWords
              .filter((el, ind) => ind < 3)
              .map((el, inx) => <span key={inx + el}>{el}</span>)}
        {p.keyWords.length > 4 ? (
          <ThreePointIcon data={p.keyWords.filter((el, index) => index > 3)} />
        ) : (
          false
        )}
      </div>
      <div className={`${currentClass}-cit`}>{p.totalCitation}</div>
      <div className={`${currentClass}-prof`}>
        {p.documentProof ? (
            <div onClick={delProof} className={`${currentClass}-transact`}>
                <Icon type="chekedIcon" className='checked-icon' width={20} height={12} viewBox="0 0 20 12"/>
                 <span>Hash</span>
                <div className={`${currentClass}-artfs__dop`}>
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

DocCard = connect(null, {...actions})(DocCard)

export default DocCard
