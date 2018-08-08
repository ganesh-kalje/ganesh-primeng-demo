import { Component, OnInit  } from '@angular/core';
import { CarService, Car } from './service/carservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
    cars: Car[];
    cols: any[];
    selectedCars: Car[];
    editRecordId: String;
    editRecordObj: Car;
    editRecordClone: Car;
    addRecordFlag: Boolean = false;
    filteredColorsSingle: any[];
    selectedColor: any;
    years: any[] = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'];

    constructor(private carService: CarService) { 
        this.editRecordObj = { "id": null, "brand": null, "year": null, "color": null, "vin": null};
        this.editRecordClone =JSON.parse(JSON.stringify(this.editRecordObj));
    }

    ngOnInit() {
        this.carService.getCarsSmall().then(cars => this.cars = cars);

        this.cols = [
            { field: 'vin', header: 'Vin' },
            { field: 'year', header: 'Year' },
            { field: 'brand', header: 'Brand' },
            { field: 'color', header: 'Color' }
        ];
    }
    
    /**
     * Trigger when user select record
     */
    onRowSelect(event) {
        console.log(event);
    }

    onRowUnselect(event) {
        console.log(event);
    }
    
    onEdit(editRecordId, editRecordObj) {
        this.editRecordId = editRecordId;
        this.editRecordObj = editRecordObj;
        this.selectedColor = {
            color : editRecordObj.color,
            code : editRecordObj.code
        };
        
    }
    
    cancelEdit() {
        this.editRecordId = "";
        this.editRecordObj =JSON.parse(JSON.stringify(this.editRecordClone));
    }
    
    updateRecord(rowNumber) {
        this.cars[rowNumber] = this.editRecordObj;
        this.cancelEdit();
    }
    
    deleteRecord(rowNumber) {
        if(window.confirm("Are you sure you want to delete?")) {
            this.cars = this.cars.filter((val, i) => i != rowNumber);
        } else {
            return false;
        }
    }
    
    addRecord() {
        this.editRecordObj.brand = 'Audi';
        this.addRecordFlag = true;
    }
    
    cancelAddrecord() {
        this.addRecordFlag = false;
        this.editRecordObj =JSON.parse(JSON.stringify(this.editRecordClone));
    }
    
    saveRecord() {
        this.editRecordObj.id = this.generateID(16);
        this.cars.push(this.editRecordObj);
        this.cancelAddrecord();
    }
    
    private generateID(length) {
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const randomNumber = Math.floor(Math.random() * possible.length)
        let text = "";
        for (let i = 0; i < length; i++) {
            text += possible.charAt(randomNumber);
        }
        return text;
    }
    
    filterColorSingle(event) {
        let query = event.query;   
        this.carService.getColors().then(colors => {
            this.filteredColorsSingle = this.filterColors(query, colors);
            console.log(this.filteredColorsSingle);
        });     
    }
    
    filterColors(query, colors: any[]):any[] {
        //Need http call here.
        let filtered : any[] = [];
        for(let i = 0; i < colors.length; i++) {
            let color = colors[i];
            if(color.color.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(color);
            }
        }
        return filtered;
    }
    
    onSuggetionSelect(selectedValue) {
        this.editRecordObj.color = selectedValue.color;
    }
}
