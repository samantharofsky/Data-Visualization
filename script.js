let data;
let valueProperties = {
  min: -Infinity,
  max: Infinity,
  avg: 0
}

let dateBoxes = [];

const URL = "https://data.cdc.gov/resource/vbim-akqf.json";

let drawingValue = 'cdc_report_dt';
function preload() {
  data = loadJSON(URL);
}

function setup() {
  createCanvas(windowWidth-20,windowHeight-20);
  background('white');
  // calculateValues();
  ellipseMode(RADIUS);
  makeShapes();
}

function makeShapes() {
  let x = 0;
  let y = 12;
  // let dx = width / Object.keys(data).length;
  // for( let i = 0; i < Object.keys(data).length; i++ ) {
  for( let key of Object.keys(data) ) {
    const timestamp = data[key].cdc_report_dt;
    if( timestamp ) {
      const [date, _] = timestamp.split("T");
      // let numberOfCircles = [i];
      fill('black');
      dateBoxes.push({
        date,
        x, 
        y,
        xR: x + textWidth(date),
        yT: y - 12,
        values: data[key]
      })
      if( x + textWidth(date) < width ) {
        x += textWidth(date) + 5;
      } else {
        x = 0;
        y += 12;
      }
    }
    
    // const y = height
  }  
}

function draw() {
  background("white");
  for( let dateBox of dateBoxes ) {
    text( dateBox.date, dateBox.x, dateBox.y);
  }
  noLoop();
  // const y = map(valueProperties.avg,valueProperties.max,valueProperties.min,0,height );
  // if (mouseX, mouseY) = [i]
  //   fill('grey');
  //   background('black');
  //   fill('white');
  //   text("drawingValue", x, y);
  //   function keyPressed() {
  // stroke('black');
  // fill('black');
//   else if( key === "0" ) {
//     drawingValue = "current_status";
//   } else if( key === "1" ) {
//     drawingValue = "Laboratory-confirmed case"; 
//   } else if( key === "2" ) {
//     drawingValue = "age_group"; 
//   } else if( key === "3" ) {
//     drawingValue = "hosp_yn"; 
//   } else if( key === "4" ) {
//     drawingValue = "icu_yn"; 
//  } else if( key === "5" ) {
//     drawingValue = "death_yn"; 
//   } else if( key === "6" ) {
//     drawingValue = "medcond_yn"; 
//   }
}

function mouseMoved() {
  for( let dateBox of dateBoxes ) {
    if( mouseInside(dateBox)) {
      // console.log( dateBox.values)
      redraw();
      fill('white');
      rect(mouseX,mouseY,200,100);
      fill('black');
      text(drawingValue, mouseX + 15, mouseY + 20)
    }
    if (key === "1"){
      drawingValue = "cdc case earliest date:";
      text(data[key].cdc_case_earliest_dt, mouseX + 15, mouseY + 40)
    }if (key === "2"){
      drawingValue = "onset date:";
      text(data[key].onset_dt, mouseX + 15, mouseY + 40)
    } if( key === "3" ) {
      drawingValue = "age group:";
      text(data[key].age_group, mouseX + 15, mouseY + 40) 
    } if( key === "4" ) {
      drawingValue = "hospitalization:"; 
      text(data[key].hosp_yn, mouseX + 15, mouseY + 40)
    } if( key === "5" ) {
      drawingValue = "icu admittance:"; 
      text(data[key].icu_yn, mouseX + 15, mouseY + 40)
    } if( key === "6" ) {
      drawingValue = "death:"; 
      text(data[key].death_yn, mouseX + 15, mouseY + 40)
    } if( key === "7" ) {
      drawingValue = "medical condition:"; 
      text(data[key].medcond_yn, mouseX + 15, mouseY + 40)
    } if (key === "8") {
      drawingValue = "gender:";
      text(data[key].sex, mouseX + 15, mouseY + 40)
    }
  }
}

function mouseInside(box) {
  return mouseX > box.x &&
        mouseX < box.xR &&
        mouseY < box.y &&
        mouseY > box.yT 
}