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

function addNewHeight(newObject, oldHeight, amt) {
  newObject.height_new = oldHeight + amt;
}

function extractHeightData(rawData, tlData) {
  const data = tlData.map(data => {
    const matchingRawData = rawData.find(r => r.character_id === data.character_id);
    const newObject = {
      character_id: data.character_id,
      sort_id: matchingRawData.sort_id,
      first_name: data.first_name,
      height: matchingRawData.height,
    };
    
    switch (matchingRawData.sort_id) {
      case 3:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 6:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 8:
        addNewHeight(newObject, matchingRawData.height, 2);
        break;
      case 11:
        addNewHeight(newObject, matchingRawData.height, 2);
        break;
      case 13:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 20:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 21:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 23:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 29:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 30:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 43:
        addNewHeight(newObject, matchingRawData.height, 2);
        break;
      case 44:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 46:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      case 48:
        addNewHeight(newObject, matchingRawData.height, 1);
        break;
      default:
        break;
    }

    return newObject;
  });



  let sortedData = data.sort((a, b) => a.sort_id - b.sort_id);
  
  sortedData = [...sortedData, 
    {
      first_name: "Esu",
      character_id: 81,
      height: 160,
    },
    {
      first_name: "Ibuki",
      character_id: 82,
      height: 165,
    },
    {
      first_name: "Kanna",
      character_id: 83,
      height: 163,
    },
    {
      first_name: "Fuyume",
      character_id: 84,
      height: 156
    },
    {
      first_name: "Raika",
      character_id: 85,
      height: 158,
    },
    {
      first_name: "Nice",
      height: 180,
      character_id: 86
    }
  ]

  return sortedData;
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
  const obj = $("<img />");
  obj.addClass("height-img-obj");
  obj.attr("src", "Human_outline_generic.svg");
  obj.attr("height", height * (CONTAINER_HEIGHT/FULL_HEIGHT));
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

function drawCharaHeight(heightData) {
  const {first_name, character_id, height, height_new} = heightData;
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();

  let adjustedHeight;
  switch (character_id) {
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
    case 81:
      adjustedHeight = height + 6;
      break;
    case 82:
      adjustedHeight = height + 5;
      break;
    case 83:
      adjustedHeight = height + 2;
      break;
    case 85:
      adjustedHeight = height + 21;
      break;
    default:
      adjustedHeight = height;
      break;
  }

  const clone = $($("#height-obj-template").html());
  const placeholderImg = new Image();
  placeholderImg.src = `https://assets.hellogirls.info/renders/character_full1_${character_id}.png`;
  const IMAGE_WIDTH = placeholderImg.width;
  const IMAGE_HEIGHT = placeholderImg.height;
  const IMAGE_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;
  const calculatedImageHeight = adjustedHeight * (CONTAINER_HEIGHT/FULL_HEIGHT);
  const calculatedImageWidth = calculatedImageHeight * IMAGE_RATIO;

  const img = $("<img />");
  img.addClass("height-img-obj");
  img.attr("id", `height-img-obj-${character_id}`);
  img.attr("src", `https://assets.hellogirls.info/renders/character_full1_${character_id}.png`);
  img.attr("height", calculatedImageHeight);
  img.attr("width", calculatedImageWidth);

  $(".height-img", clone).append(img);
  $(".height-name", clone).text(first_name)
  $(".height-number", clone).text(`${height} cm`);
  $(".height-number", clone).attr("id", `height-number-${character_id}`);

  const itemClone = $($("#character-item-template").html());
  $(".character-item-name", itemClone).text(first_name);
  $(".character-item-height", itemClone).text(`${height} cm`);
  $(".character-item-height", itemClone).attr("id", `character-item-height-${character_id}`);
  $(".character-item-delete", itemClone).click(function(e) {
    e.preventDefault();
    $(itemClone).remove();
    $(clone).remove();
    heightObjectCount--;
    disableItems();
  });
  if (!height_new) {
    $(".character-item-height-switch", itemClone).css("display", "none");
  } else {
    $(".character-item-height-switch-check", itemClone).change(function(e) {
      const heightDifference = height_new - height;
      const newCalculatedHeight = (adjustedHeight + heightDifference) * (CONTAINER_HEIGHT/FULL_HEIGHT);
      if (e.target.checked) {
        $(`#height-img-obj-${character_id}`).attr("height", newCalculatedHeight);
        $(`#height-number-${character_id}`).text(`${height_new} cm`);
        $(`#character-item-height-${character_id}`).text(`${height_new} cm`);
      } else {
        $(`#height-img-obj-${character_id}`).attr("height", calculatedImageHeight); 
        $(`#height-number-${character_id}`).text(`${height} cm`);
        $(`#character-item-height-${character_id}`).text(`${height} cm`);
      }
    })
  }

  $("#height-objects").append(clone);
  $("#character-list").append(itemClone);

  heightObjectCount++;
  disableItems();
}

function createDropdownList(heightData) {
  for (let i = 0; i < heightData.length; i++) {
    let clone = $($("#character-list-template").html());
    $(".character-list-item-name", clone).text(heightData[i].first_name);
    const heightText = `${heightData[i].height} cm ${heightData[i].height_new ? `→${heightData[i].height_new} cm` : ""}`;
    $(".character-list-item-height", clone).text(heightText);
    $(clone).click(function(e) {
      // add element to chart
      if (heightObjectCount < 5) {
        drawCharaHeight(heightData[i]);
      }
    });
    $("#character-dropdown-list").append(clone);
  }
}

function updateVh() {
  let vh = window.innerHeight * 0.01;
  $(document.documentElement).css("--vh", `${vh}px`);

  const HEIGHT_INCREMENT = 10;
  const FULL_HEIGHT = 220;
  const CONTAINER_HEIGHT = $("#height-canvas").innerHeight();

  $("#scale-container").empty();
  for (let i = 0; i < FULL_HEIGHT; i += HEIGHT_INCREMENT) {
    let clone = $($("#scale-template").html());
    $(".scale-label-left", clone).text(`${i} cm`);
    $(".scale-label-right", clone).text(`${i} cm`);
    $(clone).height(CONTAINER_HEIGHT / (FULL_HEIGHT / HEIGHT_INCREMENT));
    $("#scale-container").prepend(clone);
  }

  if ($(".height-obj").length) {
    $(".height-obj").each(function() {
      $(this).find(".height-img-obj").attr("height", parseInt($(this).find(".height-number").text().split(' ')[0]) * (CONTAINER_HEIGHT/FULL_HEIGHT))
    })
  }
}

$(document).ready(async function() {
  updateVh();
  drawHeightChart();
  const tlData = await getData(TL_DATA_URL);
  const rawData = await getData(DATA_URL);

  const heightData = extractHeightData(rawData, tlData);

  createDropdownList(heightData);

  $(window).resize(_.debounce(updateVh, 100));

  $("#height-objects").sortable({
    axis: "x"
  });

  $("#add-person").click(function(e) {
    e.preventDefault();
    if ($("#text-height").val()) {
      drawUserHeight();
    }
  });

  $("#character-filter").on("input", function(e) { 
    if ($("#character-dropdown-list").css("display") !== "none") {
      $("#character-dropdown-list").empty();
      if (e.target.value.length === 0) {
        createDropdownList(heightData)
      } else {
        let filteredHeightData = heightData.filter(d => d.first_name.toLowerCase().includes(e.target.value.toLowerCase()));
        createDropdownList(filteredHeightData);
      }
    }
   });

  $("#character-filter").click(function(e) {
    e.preventDefault();
    $("#character-dropdown-list").slideDown("fast");
  })

  $("#toggle-dropdown").click(function(e) {
    e.preventDefault();
    $("#character-dropdown-list").slideToggle("fast");
  })
});
