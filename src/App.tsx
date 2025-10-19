import SampleForm from "./form/form";
import AdvanceForm from "./form/advanceForm";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const App = () => {
  return (
    <>
      <Tabs>
        <TabList>
          <Tab>Advanve Form with Web Worker</Tab>
          <Tab>Simple Form with Validation</Tab>
        </TabList>

        <TabPanel>
          <AdvanceForm />
        </TabPanel>
        <TabPanel>
          <SampleForm />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default App;
