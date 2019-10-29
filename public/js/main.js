function showDiv() {
  const type = document.getElementsByName("type");
  if (type[0].checked) {
    document.getElementById("rectangle").style.display = "block";
    let html = document.querySelector("input[id='add1']").value;
    document.querySelector("#rectangle").innerHTML = html;
  } else if (type[1].checked) {
    document.getElementById("rectangle").style.display = "block";
    let html = document.querySelector("input[id='add2']").value;
    document.querySelector("#rectangle").innerHTML = html;
  } else if (type[2].checked) {
    document.getElementById("rectangle").style.display = "block";
    let html = document.querySelector("input[id='add3']").value;
    document.querySelector("#rectangle").innerHTML = html;
  }
}
