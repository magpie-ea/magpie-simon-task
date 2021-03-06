const keyPress_simontask = function (config) {
  magpieUtils.view.inspector.missingData(config, "key press");
  magpieUtils.view.inspector.params(config, "key press");
  const keyPress = {
    name: config.name,
    title: magpieUtils.view.setter.title(config.title, ""),
    render: function (CT, magpie) {
      let pause = Math.floor(Math.random() * (1500) + 1200);
      let startingTime;
      const question = magpieUtils.view.setter.question(
        config.data[CT].question
      );
      const key1 = config.data[CT].key1;
      const key2 = config.data[CT].key2;
      const value1 = config.data[CT][key1];
      const value2 = config.data[CT][key2];
      const viewTemplate = `<div class="magpie-view">
                    <h1 class='magpie-view-title'>${this.title}</h1>
                    <p class='magpie-response-keypress-header'><strong>${key1}</strong> = ${value1}, <strong>${key2}</strong> = ${value2}</p>
                    <p class='magpie-response-keypress-header' id = 'reminder'></p>
                    <div class='magpie-view-stimulus-container'>
                        <div class='magpie-view-stimulus magpie-nodisplay'></div>
                    </div>
                </div>`;
      const answerContainerElem = `<div class='magpie-view-answer-container'>
                        <p class='magpie-view-question'>${question}</p>`;

      $("#main")
        .html(viewTemplate);

      const handleKeyPress = function (e) {
        const keyPressed = String.fromCharCode(
            e.which
          )
          .toLowerCase();

        if (keyPressed === key1 || keyPressed === key2) {

          // $(".magpie-view-stimulus").addClass("magpie-invisible"); // hide stim for optical feedback

          const RT = Date.now() - startingTime; // measure RT before anything else

          let correctness;

          // clear old timeouts and remove them from the timeout array
          clearTimeout(window.timeout[0]);
          window.timeout.shift();
          clearTimeout(window.timeout[0]);
          window.timeout.shift();

          if (
            config.data[CT].target_object ===
            config.data[CT][keyPressed.toLowerCase()]
          ) {
            correctness = "correct";
          } else {
            correctness = "incorrect";
          }

          const trial_data = {
            trial_type: config.trial_type,
            trial_number: CT + 1,
            key_pressed: keyPressed,
            correctness: correctness,
            pause: pause,
            RT: RT
          };

          for (let prop in config.data[CT]) {
            if (config.data[CT].hasOwnProperty(prop)) {
              trial_data[prop] = config.data[CT][prop];
            }
          }

          trial_data[config.data[CT].key1] =
            config.data[CT][key1];
          trial_data[config.data[CT].key2] =
            config.data[CT][key2];

          if (config.data[CT].picture !== undefined) {
            trial_data.picture = config.data[CT].picture;
          }

          if (config.data[CT].canvas !== undefined) {
            if (config.data[CT].canvas.canvasSettings !== undefined) {
              for (let prop in config.data[CT].canvas.canvasSettings) {
                if (config.data[CT].canvas.canvasSettings.hasOwnProperty(prop)) {
                  trial_data[prop] = config.data[CT].canvas.canvasSettings[prop];
                }
              }
              delete trial_data.canvas.canvasSettings;
            }
            for (let prop in config.data[CT].canvas) {
              if (config.data[CT].canvas.hasOwnProperty(prop)) {
                trial_data[prop] = config.data[CT].canvas[prop];
              }
            }
            delete trial_data.canvas;
          }

          magpie.trial_data.push(trial_data);
          $("body")
            .off("keydown", handleKeyPress);

          setTimeout(
            function () {
              magpie.findNextView();
              $(".magpie-view-stimulus")
                .addClass("magpie-visible");
            },
            config.stim_duration
          ); // make sure the next stimulus is visible even if response happened before the timeout


        }
      };

      //$(".magpie-view").append(answerContainerElem);
      //$("body").on("keydown", handleKeyPress);

      const enableResponse = function () {
        $(".magpie-view")
          .append(answerContainerElem);
        $("body")
          .on("keydown", handleKeyPress);
        startingTime = Date.now();
      };

      //startingTime = Date.now();

      // creates the DOM of the trial view
      magpieUtils.view.createTrialDOM({
          pause: pause,
          fix_duration: config.fix_duration,
          stim_duration: config.stim_duration,
          data: config.data[CT],
          evts: config.hook,
          view: "keyPress"
        },
        enableResponse
      );
    },
    CT: 0,
    trials: config.trials
  };

  return keyPress;
};
