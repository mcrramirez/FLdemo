import React from "react";
import { FlProvider, FLContext } from "./contexts/flContext";
import FLSaveButton from "./components/flSaveButton";
import FLTextInput from "./components/flTextInput";
import FLSelect from "./components/flSelect";
import FLContainer from "./components/flContainer";
import FLRow from "./components/flRow";
import FLGridSection from "./components/flGridSection";
import withFLContext, { withOnLoad } from "./contexts/contextUtility";
import FLCheckbox from "./components/flCheckbox";
import MessageButton from "./components/flMessageButton";
/**
 * A counter button: tap the button to increase the count.
 */
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      Contact: {},
      Other: {}
    };
    this.fakeAPI = this.fakeAPI.bind(this);
    this.flOnLoad = this.flOnLoad.bind(this);
  }

  fakeAPI() {
    fetch("./fake.json")
      .then(res => res.json())
      .then(x => this.setState({ data: x }));
  }

  flOnLoad(data) {
    this.setState(data);
  }

  componentDidMount() {
    /*console.log(this.props.util.containers["MainSection"])
    let data = {Fname_nm: "Tom"}
    this.setState({data: data});*/
  }
  componentWillReceiveProps() {}

  render() {
    const { Contact, Other } = this.state;
    return (
      <div>
        <FLRow columns="10">
          <FLSaveButton text="Save All" />
        </FLRow>
        <FLContainer
          name="MainSection"
          actions={{
            get: "fake.1.json",
            save: "/apiFake/save",
            delete: "/apiFake/delete"
          }}
          flOnLoad={this.flOnLoad}
        >
          <FLRow columns="5" minWidth="200px">
            <FLTextInput
              initialValue={Contact.Fname_nm}
              label="First"
              apikey="MainSection.Fname_nm"
            />
            <FLTextInput
              initialValue={Contact.Mname_nm}
              label="Middle"
              apikey="MainSection.Mname_nm"
            />
            <FLTextInput
              defaultValue="Robertson"
              initialValue={Contact.Lname_nm}
              label="Last"
              apikey="MainSection.Lname_nm"
            />
          </FLRow>
          <FLRow columns="3" minWidth="200px">
            <FLTextInput
              initialValue={Other.somenumber}
              label="Street"
              apikey="MainSection.Address_nm"
            />
            <FLTextInput
              initialValue=""
              label="City"
              apikey="MainSection.City_nm"
            />
            <FLGridSection gridTemplateColumns="1fr max-content" gridGap="10px">
              <FLSelect
                defaultValue="MO"
                initialValue={Contact.State_nm}
                label="State"
                apikey="MainSection.State_nm"
                options={[
                  { value: "CA", text: "CA" },
                  { value: "MO", text: "MO" },
                  { value: "", text: "None" }
                ]}
              />
            </FLGridSection>
          </FLRow>
          <FLSaveButton container="MainSection" />
        </FLContainer>
        <FLContainer
          name="MainSection2"
          actions={{
            get: "fake.json",
            save: "/apiFake/save2",
            delete: "/apiFake/delete2"
          }}
          flOnLoad={this.flOnLoad}
        >
          <FLRow columns="5" minWidth="200px">
            <FLTextInput
              initialValue={Other.somenumber}
              label="Number"
              apikey="MainSection2.somenumber"
            />
            <FLTextInput
              initialValue={Other.somename}
              label="Name"
              apikey="MainSection2.somename"
            />
            <FLTextInput
              initialValue={Other.someemail}
              label="Email"
              apikey="MainSection2.someemail"
            />
            <FLGridSection gridTemplateColumns="1fr 1fr" gridGap="1em">
              <FLCheckbox
                label="Testing"
                initialValue={Other.somecheckbox}
                apikey="MainSection2.somecheckbox"
              />
              <FLCheckbox
                label="Testing"
                initialValue={Other.somecheckbox2 || 0}
                apikey="MainSection2.somecheckbox2"
              />
            </FLGridSection>
            <FLTextInput
              initialValue={Other.someemail}
              label="Email"
              apikey="MainSection2.someemail2"
            />
          </FLRow>
          <FLRow columns="10" minWidth="30px" />
          <FLSaveButton container="MainSection2" />
          <MessageButton />
        </FLContainer>
      </div>
    );
  }
}
export default withFLContext(Counter);
