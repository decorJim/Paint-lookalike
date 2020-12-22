import { Component, OnInit } from '@angular/core';
/*tslint:disable*/
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent{
  public teams: number[] = [100,101,102,103,104,105,106,107];
  public sprintNumber: number;
  public submitted: boolean = false;
  public teamNumber: number;
  public complaintArguments: string;
  public allDemands: IRecorrectionDemand[] = [];
  constructor(private demandeRecorrectionService: DemandeRecorrectionService) { }
  /*

  */
  public sendForm($event: Event) {
    this.demandeRecorrectionService.sendRecorrection()
      .then(() => this.submitted = true)
      .catch(() => {
      window.alert("Erreur dans l'envoi de la demande");
    });
  }

  public refreshDemands(): void{
    this.demandeRecorrectionService.getAllDemands()
    .then((demandesRecorrection: IRecorrectionDemand[]) => {
         this.allDemands = demandesRecorrection; 
    }).catch(() => {
      window.alert('Impossible de trouver les demandes de correction');
    })
  }
 
}

interface IRecorrectionDemand{
  sprint: number;
  team: number;
  complaintArguments: string;
  answered: boolean;
  id: number;
}

app.get("/demands",req:Request,res:Response,next:NextFunction) =>{
  res.send(recorrectionDemands);
}


app.put("/demands/answer/:id", req: Request, res: Response, next: NextFunction)=> {
  for (const demande of recorrectionDemands) {
    if (demande.id === parseInt(req.params.id)) {
        demande.answered = true;
        res.send(201);
    }
  }
  res.send(404);
}

app.delete("/demands/:id", req: Request, res: Response, next: NextFunction)=> {
  for (let i = 0; i < recorrectionDemandes.length; i++){
    if (recorrectionDemandes[i].id === parseInt(req.params.id)) {
      recorrectionDemandes.splice(i, 1);
      res.send(201);
    }
  }
  res.send(404);
}

app.get("/demandes/random/:id", req: Request, res: Response, next: NextFunction)=> {
  const temp: IRecorrectionDemand[] = [];
  for (const demande of recorrectionDemandes)
    if (demande.team === parseInt(req.params.id) && demande.answered === false)
      temp.push(demande);
  const index = Math.floor(Math.random() * temp.length - 1);
  validateDemande(temp[index])
    .then((isValid: boolean) => {
      if (isValid) res.status(201).send(temp[index]);
      res.status(400).send();
    }).catch(() => {
      res.status(404).send();
    });
}

app.get("collection/:id", req: express.Request, res: express.Response, next: NextFunction)=> {
  const items: Items[] = getAllItems(parseInt(req.params.id));
  if (items.length <= 0) res.status(404).send("No items");
  const randomItem: Item = items[Math.floor(Math.random() * items.length)];
  res.status(200).send(processItem(randomItem));
}
