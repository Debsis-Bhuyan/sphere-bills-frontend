import { app } from "./firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const APP_URL= "https://sphere-bills-backend.onrender.com/api";


export const uploadFile = (setFileUrl, file) => {
  const storage = getStorage(app);

  const name = new Date().getTime() + file.name;
  console.log();
  const storageRef = ref(storage, name);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

      console.log("Upload is " + progress + "% done");

      switch (snapshot.state) {
        case "paused":
          console.log("upload is paused");
          break;

        case "running":
          console.log("upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        console.log("successfully uploaded");
        setFileUrl(downloadUrl);
      });
    }
  );
};
export const numberToWords = (number) => {
  const ones = [
    "Zero",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  if (number < 10) {
    return ones[number];
  } else if (number < 20) {
    return teens[number - 10];
  } else if (number < 100) {
    const tenDigit = Math.floor(number / 10);
    const oneDigit = number % 10;
    if (oneDigit === 0) {
      return tens[tenDigit - 2];
    } else {
      return tens[tenDigit - 2] + "-" + ones[oneDigit];
    }
  } else if (number < 1000) {
    const hundredDigit = Math.floor(number / 100);
    const remaining = number % 100;
    if (remaining === 0) {
      return ones[hundredDigit] + " Hundred";
    } else {
      return ones[hundredDigit] + " Hundred " + numberToWords(remaining);
    }
  } else if (number < 10000) {
    const thousandDigit = Math.floor(number / 1000);
    const remaining = number % 1000;
    if (remaining === 0) {
      return ones[thousandDigit] + " Thousand";
    } else {
      return ones[thousandDigit] + " Thousand " + numberToWords(remaining);
    }
  } else if (number < 100000) {
    const thousandDigit = Math.floor(number / 1000);

    const remaining = number % 1000;
    if (remaining === 0) {
      return numberToWords(thousandDigit) + " Thousand";
    } else {
      return (
        numberToWords(thousandDigit) + " Thousand " + numberToWords(remaining)
      );
    }
  } else if (number < 1000000) {
    const lakhDigit = Math.floor(number / 100000);
    const remaining = number % 100000;
    if (remaining === 0) {
      return ones[lakhDigit] + " Lakh";
    } else {
      return ones[lakhDigit] + " Lakh " + numberToWords(remaining);
    }
  } else if (number < 10000000) {
    const lakhDigit = Math.floor(number / 100000);

    const remaining = number % 100000;
    if (remaining === 0) {
      return numberToWords(lakhDigit) + " Lakh";
    } else {
      return numberToWords(lakhDigit) + " Lakh " + numberToWords(remaining);
    }
  } else if (number < 100000000) {
    const croreDigit = Math.floor(number / 10000000);
    const remaining = number % 10000000;
    if (remaining === 0) {
      return ones[croreDigit] + " Crore";
    } else {
      return ones[croreDigit] + " Crore " + numberToWords(remaining);
    }
  } else {
    return "Number is too large to convert.";
  }
};

export const dateToSeconds = (dateString) => {
  let delimiter;
  if (dateString.includes("-")) {
    delimiter = "-";
  } else if (dateString.includes("/")) {
    delimiter = "/";
  } else {
    delimiter = " ";
  }

  const dateParts = dateString.split(delimiter);
  let year, month, day;

  if (delimiter === "-") {
    year = parseInt(dateParts[0], 10);
    month = parseInt(dateParts[1], 10);
    day = parseInt(dateParts[2], 10);
  } else {
    // For the formats DD MM YYYY and DD/MM/YYYY
    day = parseInt(dateParts[0], 10);
    month = parseInt(dateParts[1], 10); // Month in JavaScript starts from 0
    year = parseInt(dateParts[2], 10);
  }

  const timestampInSeconds = new Date(year, month, day).getTime();
  return timestampInSeconds;
};

export const dataFetch = (sales) => {
  console.log(sales)
  let timestampData = [];
  for (let i = 0; i < sales.length; i++) {
    const element = sales[i];
    if (i <= 12) {
      let timestamp;
      if (!element.date) {
        timestamp = new Date().getTime()
      } else {
        timestamp = new Date(element.date).getTime()
        // timestamp = dateToSeconds(element.date);
      }
      const da = [timestamp, parseInt(element.totalAmount || 0)];
      timestampData.push(da);
    }
  }
  return timestampData;
};

function getFirstDayOfPreviousMonth(date) {
  var year = date.getFullYear();
  var month = date.getMonth();
  if (month === 0) {
    month = 11;
    year--;
  } else {
    month--;
  }
  return new Date(year, month, 1);
}

export const getHalfYearDate = () => {
  var currentDate = new Date();

  let av;
  for (var i = 0; i < 6; i++) {
    var firstDayOfPreviousMonth = getFirstDayOfPreviousMonth(currentDate);
    currentDate = firstDayOfPreviousMonth;
    av = firstDayOfPreviousMonth;
  }

  return av;
};
