const { Extension, log, INPUT_METHOD, PLATFORMS } = require("deckboard-kit");

const audioDevices = require("audio-devices");

class AudioDevicesExtension extends Extension {
  constructor() {
    super();
    this.name = "audio-device-ext";
    this.platforms = [PLATFORMS.WINDOWS];
    this.inputs = [
      {
        label: "Select Default Device",
        value: "action",
        icon: "headphones",
        color: "#28C3CF",
        input: [
          {
            label: "Audio Device",
            ref: "device",
            type: INPUT_METHOD.INPUT_SELECT,
            items: [
              {
                label: "Speakers",
                value: "speaker"
              },
              {
                label: "Headphones",
                value: "headphones"
              },
              {
                label: "Show Devices",
                value: "devices"
              }
            ]
          }
        ]
      },
      {
        label: "Set Default Audio",
        value: "userDefinedDevice",
        icon: "headphones-alt",
        color: "#28C3CF",
        input: [
          {
            label: "Default Audio Device",
            ref: "userInputDevice",
            type: INPUT_METHOD.INPUT_TEXT
          }
        ]
      }
    ];
  }

  async execute(action, { device, userInputDevice }) {
    switch (action) {
      case "action":
        switch (device) {
          case "speaker":
            await Promise.resolve(audioDevices.setDevice("Speakers").then());
            break;
          case "headphones":
            await Promise.resolve(audioDevices.setDevice("Headphones").then());
            break;
          case "devices":
            audioDevices.getDevices();
            break;
          default:
            break;
        }
        break;
      case "userDefinedDevice":
        await Promise.resolve(audioDevices.setDevice(userInputDevice).then());
        break;
      default:
        break;
    }
  }
}

module.exports = new AudioDevicesExtension();
