import React from "react";

const Highlight = (props) => {
const {textarea, filter} = props;
if (!filter) return textarea

//const regex = /#\w+/mg;
const matchValue = textarea.match(filter)

if (matchValue) {
 return textarea.split(filter).map((s, index, array) => {
  if (index < array.length -1) {
    const c = matchValue.shift()
    return <>{s}<span className="highlight">{c}</span></>
  }else return s
 })
} 
return textarea
}
export default Highlight