


export const TruncateWords = (str, numWords) => {
    if (str.length > numWords) {
      return str.slice(0,numWords) + '...';
    }
    return str;
  };

  