module.exports = {
  name: 'notify',

  'should disable button when clicking': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="default"]')
      .assert.attr('[data-ut="default"]', 'disabled', 'true', 'button is disabled')
    .done();
  },

  'should enable button with triggered event': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="default"]')
      .assert.attr('[data-ut="default"]', 'disabled', 'true', 'button is disabled')
    .click('[data-ut="enable-default"]')
      .assert.attr('[data-ut="default"]', 'disabled').is.not('false', 'button is enabled again')
    .done();
  }
}