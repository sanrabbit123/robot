const main = async function () {
  try {
    onmessage = async function (e) {
      try {
        if (e.data.url === undefined) {
          throw new Error("invalid post message");
        }
        const { url } = e.data;
        const sseSrouce = new EventSource(url);
        sseSrouce.addEventListener("message", (e) => {
          postMessage(e.data);
        });
        sseSrouce.addEventListener("error", (e) => {
          console.log(e);
        });
      } catch (e) {
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}

main().catch((err) => { console.log(err); });
