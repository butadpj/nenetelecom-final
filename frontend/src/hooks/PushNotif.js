const PushNotif = () => {
  const testPush = async () => {
    const res = await fetch("/notif/send_push/", {
      method: "POST",
      body: JSON.stringify({
        head: "NEW ORDER!!!",
        body: "You've got new order from someone",
      }),
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };
  return { testPush };
};

export default PushNotif;
