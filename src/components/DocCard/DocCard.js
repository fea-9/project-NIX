import React from "react";
import ThreePointIcon from "../DocumentsTable/ThreePointIcon"
import TestButton from "../DocumentsTable/TestButton"

export default p => {
    let currentClass = p.vertical ? "doc-colmun" : "doc-line"
    return (
        <div className={currentClass}>
            <div className={`${currentClass}-artfs`}>
            {p.title}
            <div className={`${currentClass}-artfs__dop`}>
                {p.theme}
            </div>
            </div>
            <div className={`${currentClass}-contr`}>
                {p.contributors}
            </div>
            <div className={`${currentClass}-keyw`}>
            {p.keyWords.length <= 3
                ? p.keyWords.map((el, ind) => <span key={ind}>{el}</span>)
                : p.keyWords
                    .filter((el, ind) => ind < 3)
                    .map((el, inx) => <span key={inx + el}>{el}</span>)}
            {p.keyWords.length > 3 ? (
                <ThreePointIcon data={p.keyWords.filter((el, index) => index > 3)} />
            ) : (
                false
            )}
            </div>
            <div className={`${currentClass}-cit`}>
                {p.totalCitation}
            </div>
            <div className={`${currentClass}-prof`}>
            <TestButton text="Transact" />
            </div>
        </div>
    )
};
