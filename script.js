const TL_DATA_URL = "https://tl.data.ensemble.moe/en/characters.json";
const DATA_URL = "https://data.ensemble.moe/ja/characters.json";
const OBJ_OFFSET = 250;
const RAINBOW = ["#c73a54", "#e6a640", "#8eb031", "#5c66ed", "#db72d8"];

let nameIndex = 1;
let heightObjectCount = 0;
let personObjectCount = 0;

function drawHeightChart() {
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();
  const HEIGHT_INCREMENT = 10;

  for (let i = 0; i < FULL_HEIGHT; i += HEIGHT_INCREMENT) {
    let clone = $($("#scale-template").html());
    $(".scale-label-left", clone).text(`${i} cm`);
    $(".scale-label-right", clone).text(`${i} cm`);
    $(clone).height(CONTAINER_HEIGHT / (FULL_HEIGHT / HEIGHT_INCREMENT));
    $("#scale-container").prepend(clone);
  }
}

async function getData(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch {
    throw Error ("could not retrieve character data");
  }
}

function disableItems() {
  if (heightObjectCount >= 5) {
    $("#add-person").attr("disabled", true);
  } else {
    $("#add-person").attr("disabled", false);
  }
}

function drawUserHeight() {
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();

  const height = $("#text-height").val();
  const clone = $($("#height-obj-template").html());
  const obj = $("<object>");
  obj.attr("data", "Human_outline_generic.svg");
  obj.height(height * (CONTAINER_HEIGHT/FULL_HEIGHT));
  obj.attr("type", "image/svg+xml");
  obj.css("fill", `${RAINBOW[personObjectCount]}aa`);
  $(".height-img", clone).append(obj);
  $(".height-name", clone).text($("#text-name").val() || `person ${nameIndex}`)
  $(".height-number", clone).text(`${height} cm`);

  const itemClone = $($("#user-item-template").html());
  $(".user-item-name", itemClone).text($("#text-name").val() || `person ${nameIndex}`);
  $(".user-item-height", itemClone).text(`${height} cm`);
  $(".user-item-delete", itemClone).click(function(e) {
    e.preventDefault();
    $(itemClone).remove();
    $(clone).remove();
    heightObjectCount--;
    personObjectCount--;
    disableItems();
  });

  $("#height-objects").append(clone);
  $("#user-list").append(itemClone);

  heightObjectCount++;
  personObjectCount++;
  disableItems();
}

function drawCharaHeight(charaName, id, height) {
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();

  let adjustedHeight;
  switch (id) {
    case 4:
      adjustedHeight = height + 10;
      break;
    case 6:
      adjustedHeight = height + 5;
      break;
    case 8:
      adjustedHeight = height + 12;
      break;
    case 11:
      adjustedHeight = height + 6;
      break;
    case 12:
      adjustedHeight = height + 3;
      break;
    case 15:
      adjustedHeight = height + 4;
      break;
    case 16:
      adjustedHeight = height + 4;
      break;
    case 17:
      adjustedHeight = height + 1;
      break;
    case 23:
      adjustedHeight = height + 4;
      break;
    case 24:
      adjustedHeight = height + 1;
      break;
    case 25:
      adjustedHeight = height + 32;
      break;
    case 26:
      adjustedHeight = height + 1;
      break;
    case 27:
      adjustedHeight = height + 1;
      break;
    case 28:
      adjustedHeight = height + 5;
      break;
    case 29:
      adjustedHeight = height + 4;
      break;
    case 30:
      adjustedHeight = height + 20;
      break;
    case 34:
      adjustedHeight = height + 2;
      break;
    case 35:
      adjustedHeight = height + 10;
      break;
    case 37:
      adjustedHeight = height + 5;
      break;
    case 40:
      adjustedHeight = height + 4;
      break;
    case 51:
      adjustedHeight = height + 13;
      break;
    case 67:
      adjustedHeight = height + 7;
      break;
    case 68:
      adjustedHeight = height + 7;
      break;
    case 69:
      adjustedHeight = height + 7;
      break;
    case 70:
      adjustedHeight = height + 7;
      break;
    case 71:
      adjustedHeight = height + 4;
      break;
    default:
      adjustedHeight = height;
      break;
  }

  const clone = $($("#height-obj-template").html());
  const img = $("<img />");
  img.attr("src", `https://res.cloudinary.com/df2zvtnjc/image/upload/v1689533273/transparent-renders/character_full1_${id}.png`);
  img.attr("height", adjustedHeight * (CONTAINER_HEIGHT/FULL_HEIGHT));

  $(".height-img", clone).append(img);
  $(".height-name", clone).text(charaName)
  $(".height-number", clone).text(`${height} cm`);

  const itemClone = $($("#character-item-template").html());
  $(".character-item-name", itemClone).text(charaName);
  $(".character-item-height", itemClone).text(`${height} cm`);
  $(".character-item-delete", itemClone).click(function(e) {
    e.preventDefault();
    $(itemClone).remove();
    $(clone).remove();
    heightObjectCount--;
    disableItems();
  });

  $("#height-objects").append(clone);
  $("#character-list").append(itemClone);

  heightObjectCount++;
  disableItems();
}

function createDropdownList(tlData, rawData) {
  for (let i = 0; i < tlData.length; i++) {
    if (tlData[i].charcter_id !== 32 && tlData[i].charcter_id !== 33) {
      let thisRawData = rawData.find(d => d.character_id === tlData[i].character_id);
      let clone = $($("#character-list-template").html());
      $(".character-list-item-name", clone).text(tlData[i].first_name);
      $(".character-list-item-height", clone).text(`${thisRawData.height} cm`);
      $(clone).click(function(e) {
        // add element to chart
        if (heightObjectCount < 5) {
          drawCharaHeight(tlData[i].first_name, tlData[i].character_id, thisRawData.height);
        }
      });
      $("#character-dropdown-list").append(clone);
    }
  }
}

$(document).ready(async function() {
  drawHeightChart();
  const tlData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);

  createDropdownList(tlData, rawData);

  $("#height-objects").sortable({
    axis: "x"
  });

  $("#add-person").click(function(e) {
    e.preventDefault();
    if ($("#text-height").val()) {
      drawUserHeight();
    }
  });

  $("#character-filter").click(function(e) {
    e.preventDefault();
    $("#character-dropdown-list").slideToggle("fast");
  })

  $("#toggle-dropdown").click(function(e) {
    e.preventDefault();
    $("#character-dropdown-list").slideToggle("fast");
  })
});