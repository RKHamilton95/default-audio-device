const { Extension, log, INPUT_METHOD, PLATFORMS } = require("deckboard-kit");

var portAudio = require("naudiodon");
const audioDevices = require("audio-devices");

class AudioDevicesExtension extends Extension {
  constructor() {
    super();
    this.name = "audio-device-ext";
    this.platforms = [PLATFORMS.WINDOWS];
    this.inputs = [
      {
        label: "Action",
        value: "action",
        icon: "book",
        color: "#8E44AD",
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
                label: "Headset",
                value: "headset"
              },
              {
                label: "Devices",
                value: "devices"
              }
            ]
          }
        ]
      },
      {
        label: "Set Default Audio",
        value: "defAudio",
        icon: "book",
        color: "#8E44AD",
        input: [
          {
            label: "Default Audio Device",
            ref: "defDevice",
            type: INPUT_METHOD.INPUT_TEXT
            // items: [
            //   {
            //     label: "Default Device",
            //     ref: "defDevice"
            //   }
            // ]
          }
        ]
      }
    ];
  }

  async execute(action, { device, defDevice }) {
    log.error("------------------");
    log.error(device);
    log.error(defDevice);
    log.error("------------------");
    switch (action) {
      case "action":
        switch (device) {
          case "speaker":
            log.error("Speaker");
            log.error(
              await Promise.resolve(audioDevices.setDevice("Speakers").then())
            );
            break;
          case "headset":
            log.error("Headset");
            log.error(
              await Promise.resolve(audioDevices.setDevice("Headphones").then())
            );
            break;
          case "devices":
            log.error("Devices");
            audioDevices.getDevices();
            break;
          default:
            break;
        }
        break;
      case "defAudio":
        log.error(portAudio.getDevices());
        log.error(
          await Promise.resolve(audioDevices.setDevice(defDevice).then())
        );
        break;
      default:
        break;
    }
  }
}

module.exports = new AudioDevicesExtension();
