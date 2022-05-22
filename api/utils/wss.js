const uis = [];

exports.addUi = ui => uis.push(ui);

exports.removeUi = ws => {
  const index = uis.findIndex(ui => ui.ws === ws);
  return uis.splice(index, 1);
};

exports.getUiById = id => uis.find(ui => ui._id === id);

exports.getUiyByWs = ws => uis.find(ui => ui.ws === ws);

exports.broadcast = (type, payload, to) => {
  if (to) {
    to.send(JSON.stringify({ type, payload }));
  } else {
    uis.forEach(ui => ui.ws.send(JSON.stringify({ type, payload })));
  }
};

exports.getUsernames = () => uis.map(ui => ui.username);
