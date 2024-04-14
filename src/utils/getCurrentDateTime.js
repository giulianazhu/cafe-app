function getCurrentDateTime() {
  const now = new Date();
  // date components
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month starts from 0
  const day = String(now.getDate()).padStart(2, '0');
  // time components
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  // YYYY-MM-DD HH:mm:ss format
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return dateTimeString;
}

export default getCurrentDateTime;
