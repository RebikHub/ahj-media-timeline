export default async function notificationBox() {
  if (!window.Notification) {
    return;
  }

  const notification = new Notification(`Sample notification ${new Date()}`, {
    body: 'Необходимо выдать право на запись или использовать другой браузер!',
    requireInteraction: true,
  });
  notification.onerror = (error) => {
    console.log(error);
  };
}
