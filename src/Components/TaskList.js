import React,{useState} from 'react';
import _ from 'lodash';
import  "../css/TaskList.css"
import { Card, Feed,Accordion,Icon,Modal,Button,Header,Input,Dropdown,Label } from 'semantic-ui-react'
function TaskList({space,title}) {

    const [tasks,setTasks] = useState([{
        'title':'',
        'priority':'',
        'description':'',
        'start-date':'',
        'end-date':'',
        'status':''
    }]);


    const statusOptions = [
      {key:'BackLog',value:'BackLog',text:'BackLog'},
      {key:'In Progress',value:'In Progress',text:'In Progress'},
      {key:'Done',value:'Done',text:'Done'},

    ]


    const [taskDescription,setTaskDescription] = useState("");
    const [taskTitle,setTaskTitle] = useState("");
    const [taskPriority,setTaskPriority] = useState("");
    const [taskStatus,setTaskStatus] = useState("");
    const [taskStartDate,setTaskStartDate] = useState("");
    const [taskEndDate,setTaskEndDate] = useState("");

    const [isDescriptionEditable,setIsDescriptionEditable] = useState(-1)
    const [isStatusEditable,setIsStatusEditable] = useState(-1)

  



    const [taskModalOpen,setTaskModalOpen] = useState(false)


    function addNewTask (){
      

      if(taskStatus === "" || taskEndDate === "" || taskStartDate === "" || taskDescription === "" || taskPriority === "" || taskTitle === ""){
        alert("Some Input values might be empty")
        return
      }

      if(!(taskStatus === "BackLog" || taskStatus == "In Progress" || taskStatus === "Done")){
        alert("Wrong Task Status Chosen , Value should be Backlog or In Progress or Done ")
        return
      }

      if(new Date(taskEndDate) < new Date(taskStartDate)){
        alert("End Date must be behind Start Date")
        return
      }

      setTasks([...tasks,{'title':taskTitle,'description':taskDescription,'priority':taskPriority,'start-date':taskStartDate,'end-date':taskEndDate,'status':taskStatus}])
      setTaskModalOpen(false)

    }


    
    const panels = _.times(tasks.length, (i) => ({
      
        key: `panel-${i}`,
        title:  {
          content:(
           <> <span> {tasks[i].status}</span>  &nbsp;&nbsp;  <button onClick={()=>{setIsStatusEditable(i)}}> <Icon name = "pencil"></Icon> </button> </>
          )
        } ,

        content:  {

          content:(
            <span>
              <ul>
              <li> 
             
                <><Label> Description = {tasks[i].description }   </Label> &nbsp;&nbsp; <button onClick={()=>{setIsDescriptionEditable(i)}} > <Icon name = "pencil"/> </button> </>
                
              </li> 
              <br/>
              
              <li> <Label> Start-Date = {tasks[i]['start-date']} </Label> </li>
              <br/>

              <li> <Label> End-Date = {tasks[i]['end-date']  } </Label>  </li>
              <br/>

              <li> <Label>  Priority = {tasks[i].priority} </Label> </li>
              <br/>


              </ul>
          
          </span>
          )
        }
    
         

      }))


    return (
        <div>

{isStatusEditable !== -1 && (
          <Modal
          closeIcon
          open={isStatusEditable !== -1}
          
          onClose={() => setIsStatusEditable(-1)}
          // onOpen={() => setTaskModalOpen(true)}
        >
        <Header icon='angle right' content='Add New Task' />
        <Modal.Content className="modalinputcontent">
          
          
          <select className="ui fluid  dropdown" onChange={(e)=>{ console.log(e.target.value); setTaskStatus(e.target.value)}}> 
              {statusOptions.map(opt =>(
                <option value={opt.value} key={opt.key}>  {opt.text}  </option>
              ))}
          </select>
        </Modal.Content>
          <Modal.Actions>
            <Button color='grey' onClick={() =>{
                let currentTask = JSON.parse(JSON.stringify(tasks))
                console.log(isStatusEditable);
                currentTask[isStatusEditable]['status'] = taskStatus
                console.log("Current Task",currentTask);
                setTasks(currentTask)
                setIsStatusEditable(-1)
            
            }}>
              <Icon name='add'  /> Edit Status
            </Button>
          </Modal.Actions>
        </Modal>
        )}

        {isDescriptionEditable !== -1 && (
          <Modal
          closeIcon
          open={isDescriptionEditable !== -1}
          
          onClose={() => setIsDescriptionEditable(-1)}
          // onOpen={() => setTaskModalOpen(true)}
        >
        <Header icon='angle right' content='Add New Task' />
        <Modal.Content className="modalinputcontent">
          
          <Input focus size="large" placeholder = "Edit Description"  label="Choose Description" labelPosition='right'  onChange= {(e)=>{setTaskDescription(e.target.value)}}/> <br/><br/> 
         
        </Modal.Content>
          <Modal.Actions>
            <Button color='grey' onClick={() =>{
                let currentTask = JSON.parse(JSON.stringify(tasks))
                console.log(isDescriptionEditable);
                currentTask[isDescriptionEditable]['description'] = taskDescription
                console.log("Current Task",currentTask);
                setTasks(currentTask)
                setIsDescriptionEditable(-1)
            
            }}>
              <Icon name='add'  /> Edit Description
            </Button>
          </Modal.Actions>
        </Modal>
        )}

          {taskModalOpen === true && (
                        <Modal
                          closeIcon
                          open={taskModalOpen}
                          
                          onClose={() => setTaskModalOpen(false)}
                          onOpen={() => setTaskModalOpen(true)}
                        >
                        <Header icon='angle right' content='Add New Task' />
                        <Modal.Content className="modalinputcontent">
                          <div className="modalinputcontent">
                          
                          <Input focus size="large" placeholder = "Enter task title"  label="Choose Title" labelPosition='right'  onChange= {(e)=>{setTaskTitle(e.target.value)}}/> <br/><br/> 
                         
                          <Input focus size="large" placeholder = "Enter Task Description" label="Choose Description" labelPosition='right'  onChange={(e)=>{setTaskDescription(e.target.value)}}/> <br/> <br/>
                          
                          <Input focus size="large" placeholder = "Enter Task Priority" label = "Choose Priority" labelPosition='right'  onChange={(e)=>{setTaskPriority(e.target.value)}} /> <br/> <br/>

                          <label>Choose Task Status</label>
                          <select className="ui   dropdown" onChange={(e)=>{ console.log(e.target.value); setTaskStatus(e.target.value)}}> 
                          {statusOptions.map(opt =>(
                            <option value={opt.value} key={opt.key}>  {opt.text}  </option>
                          ))}
                          </select>
                          <br/>
                          <Input focus size="large" type="date" placeholder = "Enter Start Date" labelPosition='right'  label="Choose Start Date" onChange={(e)=>{setTaskStartDate(e.target.value)}}/> <br/> <br/>
                         
                          <Input focus size="large" type="date" placeholder = "Enter End Date" labelPosition='right'  label = "Choose End Date" onChange={(e)=>{setTaskEndDate(e.target.value)}}/> <br/> <br/>
                          </div>
                        </Modal.Content>
                        <Modal.Actions>
                          <Button color='gray' onClick={() => addNewTask()}>
                            <Icon name='add'  /> Add Task
                          </Button>
                        </Modal.Actions>
                      </Modal>
                  )}
            {tasks.map((task,i)=>{

                return (


                  <div className="cardBody">
                  
                    <Card>
                      
                    {i ==0 && (<Card.Content>
                     <Card.Header> {title} 
                     {space === 5 && (<> &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; </>)} 
                     {space === 1 && (<> &nbsp; </>)} 
                        <Button onClick={()=>{setTaskModalOpen(true)}} ><Icon disabled name='plus' /> </Button>  
                      </Card.Header>
                    </Card.Content> )}
                    {i !== 0 && (
                      <Card.Content>
                      <Feed>
                        <Feed.Event>
                        
                          <Feed.Content>
                            <Feed.Date content={task.title} />
                            <Feed.Summary>
                          
                                
                                <Accordion
                                    defaultActiveIndex = {[0,2]}
                                    panels = {[panels[i]]}
                                    exclusive = {false}
                                    fluid
                                >    
                                </Accordion>
                            </Feed.Summary>
                          </Feed.Content>
                        </Feed.Event>  
                      </Feed>
                    </Card.Content>
                    )}
                    
                  </Card>
                  </div>
                )
            })}
        </div>
    )
}

export default TaskList
