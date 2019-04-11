import React from "react";
import ThreePointIcon from "../DocumentsTable/ThreePointIcon";
import Button from "../BaseComponents/Button";
import varyDateView from "../../utils/varyDateView.js";
import Icon from "../BaseComponents/icon/index";

export default p => {
  let currentClass = p.vertical ? "doc-colmun" : "doc-line";
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
            <div className={`${currentClass}-transact`}>
                <Icon type="chekedIcon" className='checked-icon' width={20} height={12} viewBox="0 0 20 12"/>
                 <span>Hash</span>
                <div className={`${currentClass}-artfs__dop`}>
                    {varyDateView(p.documentProof.modifiedDate)}
                </div>
            </div>
        ) : (
          <Button children="Transact" className="btn-documents" />
        )}
      </div>
    </div>
  );
};
