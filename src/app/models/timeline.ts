export class Timeline {
    datetime: string;
    event_name: string;
    patient_id: string;
    intake_id: string;

    constructor(datetime: string, event_name: string, patient_id: string, intake_id: string) {
        this.datetime = datetime;
        this.event_name = event_name;
        this.patient_id = patient_id;
        this.intake_id = intake_id;
    }

}