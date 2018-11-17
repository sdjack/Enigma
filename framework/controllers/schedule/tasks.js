exports.tasks = function (scheduler) {

  // scheduler.createTask("*/1 * * * *", function() {
  //   var sql = "EXECUTE [dbo].[GenerateDemoEvent] ";
  //   for (var x = 0; x < 5; x++) {
  //     scheduler.db.query(sql);
  //   }
  // });

  scheduler.createTask("0 * * * *", function() {
    scheduler.db.query("EXECUTE [dbo].[ArchiveUserActivity] ");
  });

  scheduler.createTask("30 * * * *", function() {
    scheduler.db.query("EXECUTE [dbo].[ArchiveEventNodes] ");
  });

  // scheduler.createTask("* */1 * * *", function() {
  //   scheduler.socket.updateNamespaces();
  // });

  scheduler.createTask("*/0.5 * * * *", function() {
    scheduler.socket.processQueue();
  });

};
