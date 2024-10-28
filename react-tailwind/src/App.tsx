import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import './App.css'
import Dropdown from './components/dropdown/dropdown'
import Select, { Option } from './components/select/select'
import { Accordian, AccordianContent, AccordianItem, AccordianTrigger, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/accordian/accordian'
import Card, { CardBody, CardDesciription, CardHeader, CardTitle } from './components/card/card'

function App() {

  const [selectedOption, setSelectedOption] = useState("")

  const handleSelectChange = (event) => {
    console.log("Selected value:", event.target.value)
    setSelectedOption(event.target.value)
  }

  return (
    <div className='x h-screen w-full flex flex-col gap-5 items-center justify-center'>
      <Dropdown variant='primary'>

      </Dropdown>
      <Select
        label="Choose an option"
        onChange={handleSelectChange}
        value={selectedOption}
      >
        <Option value="option1">Option 1</Option>
        <Option value="option2">Option 2</Option>
        <Option value="option3">Option 3</Option>
      </Select>
      <div className="p-6 w-[1000px]">
        <Accordion usePlus={true}>
          <AccordionItem trigger="Personal Information">
            Content for section 1
          </AccordionItem>
          <AccordionItem trigger="Bank Information">
            <div className='flex flex-col gap-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit asperiores quibusdam aperiam error facere suscipit debitis explicabo beatae accusamus nobis. Assumenda labore earum, velit autem nisi officia, sapiente magnam quaerat harum unde aut libero dignissimos rem distinctio eligendi placeat illum error molestias dolorem odio! Tempore vel modi facilis dolores, consequatur harum. Vel non nostrum facilis tenetur ducimus, sed excepturi nam quam voluptatibus dolor! Exercitationem perspiciatis unde placeat quisquam vel nulla?
            </div>
          </AccordionItem>
          <AccordionItem trigger="Employment Information">
            <div className='flex flex-col gap-6'>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit fugiat inventore perspiciatis adipisci quia enim deserunt. Deserunt distinctio ab dolorum!</p>
            </div>
          </AccordionItem>
        </Accordion>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Card Header</CardTitle>
          <CardDesciription>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto, eum.</CardDesciription>
        </CardHeader>
        <CardBody className='w-[500px]'>
          <Select>
            <Option value='1'>Opt 1</Option>
            <Option value='2'>Opt 2</Option>
            <Option value='3'>Opt 3</Option>
          </Select>

          <Accordion usePlus={true}>
          <AccordionItem trigger="Personal Information">
            Content for section 1
          </AccordionItem>
          <AccordionItem trigger="Bank Information">
            <div className='flex flex-col gap-6'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit asperiores quibusdam aperiam error facere suscipit debitis explicabo beatae accusamus nobis. Assumenda labore earum, velit autem nisi officia, sapiente magnam quaerat harum unde aut libero dignissimos rem distinctio eligendi placeat illum error molestias dolorem odio! Tempore vel modi facilis dolores, consequatur harum. Vel non nostrum facilis tenetur ducimus, sed excepturi nam quam voluptatibus dolor! Exercitationem perspiciatis unde placeat quisquam vel nulla?
            </div>
          </AccordionItem>
          <AccordionItem trigger="Employment Information">
            <div className='flex flex-col gap-6'>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit fugiat inventore perspiciatis adipisci quia enim deserunt. Deserunt distinctio ab dolorum!</p>
            </div>
          </AccordionItem>
        </Accordion>
        </CardBody>
      </Card>
    
    </div>
  )
}

export default App
