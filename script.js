// Variables for selection sort canvas
const selectionCanvas = document.getElementById("selectionCanvas");
const selectionCtx = selectionCanvas.getContext("2d");
const selectionWidth = selectionCanvas.width;
const selectionHeight = selectionCanvas.height;

// Variables for bubble sort canvas
const bubbleCanvas = document.getElementById("bubbleCanvas");
const bubbleCtx = bubbleCanvas.getContext("2d");
const bubbleWidth = bubbleCanvas.width;
const bubbleHeight = bubbleCanvas.height;

// Variables for insertion sort canvas
const insertionCanvas = document.getElementById("insertionCanvas");
const insertionCtx = insertionCanvas.getContext("2d");
const insertionWidth = insertionCanvas.width;
const insertionHeight = insertionCanvas.height;

// Variables for merge sort canvas
const mergeCanvas = document.getElementById("mergeCanvas");
const mergeCtx = mergeCanvas.getContext("2d");
const mergeWidth = mergeCanvas.width;
const mergeHeight = mergeCanvas.height;

// Variables
const barWidth = 4;
const barMargin = 1;
const numBars = Math.floor(selectionWidth / (barWidth + barMargin));

// Utility function to generate random integers
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Generate random arrays for selection sort, bubble sort, insertion sort, and merge sort
const selectionArray = [];
const bubbleArray = [];
const insertionArray = [];
const mergeArray = [];
for (let i = 0; i < numBars; i++) {
  const randomNumber = randomInt(10, selectionHeight);
  selectionArray.push(randomNumber);
  bubbleArray.push(randomNumber);
  insertionArray.push(randomNumber);
  mergeArray.push(randomNumber);
}

// Function to draw the arrays and headings on the canvas
function drawArrays() {
  // Clear selection sort canvas
  selectionCtx.clearRect(0, 0, selectionWidth, selectionHeight);

  // Clear bubble sort canvas
  bubbleCtx.clearRect(0, 0, bubbleWidth, bubbleHeight);

  // Clear insertion sort canvas
  insertionCtx.clearRect(0, 0, insertionWidth, insertionHeight);

  // Clear merge sort canvas
  mergeCtx.clearRect(0, 0, mergeWidth, mergeHeight);

  // Draw selection sort heading
  selectionCtx.fillStyle = "black";
  selectionCtx.font = "14px Arial";
  selectionCtx.fillText("Selection Sort", 10, 20);

  // Draw bubble sort heading
  bubbleCtx.fillStyle = "black";
  bubbleCtx.font = "14px Arial";
  bubbleCtx.fillText("Bubble Sort", 10, 20);

  // Draw insertion sort heading
  insertionCtx.fillStyle = "black";
  insertionCtx.font = "14px Arial";
  insertionCtx.fillText("Insertion Sort", 10, 20);

  // Draw merge sort heading
  mergeCtx.fillStyle = "black";
  mergeCtx.font = "14px Arial";
  mergeCtx.fillText("Merge Sort", 10, 20);

  // Draw selection sort array
  for (let i = 0; i < numBars; i++) {
    const selectionBarHeight = selectionArray[i];
    const selectionX = i * (barWidth + barMargin);
    const selectionY = selectionHeight - selectionBarHeight;

    selectionCtx.fillStyle = "blue";
    selectionCtx.fillRect(selectionX, selectionY, barWidth, selectionBarHeight);
  }

  // Draw bubble sort array
  for (let i = 0; i < numBars; i++) {
    const bubbleBarHeight = bubbleArray[i];
    const bubbleX = i * (barWidth + barMargin);
    const bubbleY = bubbleHeight - bubbleBarHeight;

    bubbleCtx.fillStyle = "red";
    bubbleCtx.fillRect(bubbleX, bubbleY, barWidth, bubbleBarHeight);
  }

  // Draw insertion sort array
  for (let i = 0; i < numBars; i++) {
    const insertionBarHeight = insertionArray[i];
    const insertionX = i * (barWidth + barMargin);
    const insertionY = insertionHeight - insertionBarHeight;

    insertionCtx.fillStyle = "green";
    insertionCtx.fillRect(insertionX, insertionY, barWidth, insertionBarHeight);
  }

  // Draw merge sort array
  for (let i = 0; i < numBars; i++) {
    const mergeBarHeight = mergeArray[i];
    const mergeX = i * (barWidth + barMargin);
    const mergeY = mergeHeight - mergeBarHeight;

    mergeCtx.fillStyle = "orange";
    mergeCtx.fillRect(mergeX, mergeY, barWidth, mergeBarHeight);
  }
}

// Selection Sort Algorithm
async function selectionSort() {
  for (let i = 0; i < numBars - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < numBars; j++) {
      if (selectionArray[j] < selectionArray[minIndex]) {
        minIndex = j;
      }
      drawArrays();
      await sleep(50);
    }

    if (minIndex !== i) {
      // Swap elements
      const temp = selectionArray[i];
      selectionArray[i] = selectionArray[minIndex];
      selectionArray[minIndex] = temp;
      drawArrays();
      await sleep(50); // Add a small delay for visualization
    }
  }
}

// Bubble Sort Algorithm
async function bubbleSort() {
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < numBars - 1; i++) {
      if (bubbleArray[i] > bubbleArray[i + 1]) {
        // Swap elements
        const temp = bubbleArray[i];
        bubbleArray[i] = bubbleArray[i + 1];
        bubbleArray[i + 1] = temp;
        swapped = true;
        drawArrays();
        await sleep(50); // Add a small delay for visualization
      }
    }
  } while (swapped);
}

async function insertionSort() {
  for (let i = 1; i < numBars; i++) {
    const key = insertionArray[i];
    let j = i - 1;
    while (j >= 0 && insertionArray[j] > key) {
      insertionArray[j + 1] = insertionArray[j];
      j--;
      drawArrays();
      await sleep(50); // Add a small delay for visualization
    }
    insertionArray[j + 1] = key;
    drawArrays();
    await sleep(50); // Add a small delay for visualization
  }
}

// Merge Sort Algorithm
async function mergeSort(arr, left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);

    await merge(arr, left, mid, right);
    drawArrays();
    await sleep(100); // Add a delay for visualization
  }
}

// Utility function to merge two sorted arrays
async function merge(arr, left, mid, right) {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const leftArray = [];
  const rightArray = [];

  for (let i = 0; i < n1; i++) {
    leftArray[i] = arr[left + i];
  }

  for (let j = 0; j < n2; j++) {
    rightArray[j] = arr[mid + 1 + j];
  }

  let i = 0;
  let j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }
    k++;
    drawArrays();
    await sleep(50); // Add a delay for visualization
  }

  while (i < n1) {
    arr[k] = leftArray[i];
    i++;
    k++;
    drawArrays();
    await sleep(50); // Add a delay for visualization
  }

  while (j < n2) {
    arr[k] = rightArray[j];
    j++;
    k++;
    drawArrays();
    await sleep(50); // Add a delay for visualization
  }
}

// Utility function to introduce a delay
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call both sorting algorithms
selectionSort();
bubbleSort();
insertionSort();
mergeSort(mergeArray, 0, mergeArray.length - 1);
