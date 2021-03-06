/**
 * Nurani Passage Picker class.
 */
function Picker(opts) {
  this.defaults = {
    osisIDWork: '',
    osisID:     ''
  };

  this.opts = $.extend(this.defaults, opts);
  this.init();

  return this;
}

Picker.prototype.init = function () {
  this.nuraniLibraryPickerUI = new NL.PickerUI({
    osisIDWork: this.opts.osisIDWork,
    osisID: this.opts.osisID
  });
  this.$dialog = this.createDialog(this.nuraniLibraryPickerUI.$element);

  return this;
};

Picker.prototype.createDialog = function ($element) {
  var that    = this,
      $window = $(window),
      $dialog = $element.dialog({
                  autoOpen: false,
                  width: $window.width() * 0.88,
                  height: $window.height() * 0.80,
                  modal: true,
                  buttons: {
                    Done: function() {
                      var data = that.nuraniLibraryPickerUI.getSelectionOSIS();

                      if (data) {
                        if (that.opts.onPicked) {
                          that.opts.onPicked(data);
                        }
                        $(this).dialog('close');
                      }
                      // NOTE: Error display is managed by PickerUI
                    },
                    Cancel: function() {
                      if (that.opts.onCancel) {
                        that.opts.onCancel();
                      }
                      $(this).dialog('close');
                    }
                  },
                  close: function() {
                    // TODO: Do things on close, like clear the state.
                  },
                  open: function () { that.nuraniLibraryPickerUI.didResize(); },
                  resize: function () { that.nuraniLibraryPickerUI.didResize(); }
                });

  return $dialog;
};

/**
 * Display the passage picker.
 */
Picker.prototype.pick = function () {
  this.$dialog.dialog('open');

  return this;
};
