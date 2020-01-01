// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges= player.querySelectorAll('.player__slider');

// Functions
function togglePlay() {
  const startStop = video.paused ? 'play' : 'pause';
  video[startStop]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
}

// Skip forward or backward when skip buttons are clicked:
function skip() {
  // Converts the data-skip attribute into a number and adds it to the current time:
  video.currentTime += parseFloat(this.dataset.skip);
}

// Adjust playback rate or volume:
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Show percentage of movie played:
function handleProgress() {
  // Calculate progress:
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

  // Update the video to match scrubTime:
  video.currentTime = scrubTime;
}


// Event Listeners

// When video element is clicked, start or stop playback:
video.addEventListener('click', togglePlay);

// When toggle element is clicked, start or stop playback:
toggle.addEventListener('click', togglePlay);

// Listen for when video is played or paused, and change the play/pause icon:
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

// Skip forward or backward when skip buttons are clicked:
skipButtons.forEach(button => button.addEventListener('click', skip));

// Adjust playback rate or volume:
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

// Update video progress:
video.addEventListener('timeupdate', handleProgress);

// Scrub progress bar left or right:
let mousedown = false;
progress.addEventListener('click', scrub);
// If the mouse is down, run scrub function:
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);