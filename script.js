// function calculateMinCost() {
//   //your code here
  
  
  
// }  


function calculateMinCost(ropes) {
  // Check if the input is empty or contains only one rope
  if (ropes.length <= 1) {
    return 0;
  }

  // Create a min heap using the ropes array
  const heap = new MinHeap(ropes);

  let totalCost = 0;

  // Keep connecting ropes until only one rope remains in the heap
  while (heap.size() > 1) {
    // Remove the two ropes with the smallest lengths from the heap
    const rope1 = heap.extractMin();
    const rope2 = heap.extractMin();

    // Calculate the cost of connecting the two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the combined rope length back into the heap
    heap.insert(cost);
  }

  return totalCost;
}

// Implementation of MinHeap data structure
class MinHeap {
  constructor(arr = []) {
    this.heap = [];
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  size() {
    return this.heap.length;
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    const minValue = this.heap[0];
    const lastValue = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = lastValue;
      this.bubbleDown(0);
    }

    return minValue;
  }

  bubbleUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      this.swap(index, parentIndex);
      this.bubbleUp(parentIndex);
    }
  }

  bubbleDown(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    let smallestIndex = index;

    if (
      leftIndex < this.heap.length &&
      this.heap[leftIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = leftIndex;
    }

    if (
      rightIndex < this.heap.length &&
      this.heap[rightIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = rightIndex;
    }

    if (smallestIndex !== index) {
      this.swap(index, smallestIndex);
      this.bubbleDown(smallestIndex);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  const inputElement = document.getElementById('ropes-input');
  const ropes = inputElement.value
    .split(',')
    .map((rope) => parseInt(rope.trim(), 10));

  const resultElement = document.getElementById('result');
  resultElement.textContent = calculateMinCost(ropes);
}

// Attach form submission handler
const formElement = document.getElementById('ropes-form');
formElement.addEventListener('submit', handleFormSubmit);
