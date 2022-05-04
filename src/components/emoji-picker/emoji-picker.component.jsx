import React from "react";
import Picker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { GrEmoji } from "react-icons/gr";
import "./emoji-picker.style.scss";

class EmojiPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      isPickerActive: false,
    };
  }
  onEmojiClick = (event, emojiObject) => {
    event.target.value = this.props.inputChatText + " " + emojiObject.emoji;
    // console.log(emojiObject);
    this.props.handleChange(event);
  };

  render() {
    return (
      <div className="emoji-picker">
        {this.state.isPickerActive ? (
          <div className="emoji-selector-box">
            <Picker
              onEmojiClick={this.onEmojiClick}
              disableAutoFocus={true}
              skinTone={SKIN_TONE_MEDIUM_DARK}
              groupNames={{ smileys_people: "PEOPLE" }}
              native
            />
          </div>
        ) : null}
        <div className="emoji-picker-btn">
          <GrEmoji
            className="gr-emoji"
            onClick={() =>
              this.setState({ isPickerActive: !this.state.isPickerActive })
            }
          />
        </div>
      </div>
    );
  }
}

export default EmojiPicker;
