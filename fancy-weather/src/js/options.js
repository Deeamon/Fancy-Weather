const OPTIONS = {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  timezone: 'UTC',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false,
};

function getOptionState() {
  return Object.keys(OPTIONS);
}

module.exports = {
  getOptionState,
  OPTIONS,
};
