export class Notes {
    notes_id: string;
    notes_data: string;
    operation_center_code: string;
    date: string;
    nex_review_date: string;
    patient_id: string;
    intake_id: string;

    constructor(notes_id: string, notes_data: string, operation_center_code: string, date: string, nex_review_date: string, 
        patient_id: string, intake_id: string) {
        this.notes_id = notes_id;
        this.notes_data = notes_data;
        this.operation_center_code = operation_center_code;
        this.date = date;
        this.nex_review_date = nex_review_date;
        this.patient_id = patient_id;
        this.intake_id = intake_id;
    }

}