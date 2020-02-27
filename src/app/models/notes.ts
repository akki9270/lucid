export class Notes {
    notes_id: string;
    notes_data: string;
    patient_id: string;
    intake_id: string;

    constructor(notes_id: string, notes_data: string, patient_id: string, intake_id: string) {
        this.notes_id = notes_id;
        this.notes_data = notes_data;
        this.patient_id = patient_id;
        this.intake_id = intake_id;
    }

}