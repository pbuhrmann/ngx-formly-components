export interface ActionEvent {
    name: string;       //Nombre del componente objetivo: 'heatmap', 'clusters', 'new-element-map-popup'
    command?: string;   //'toggle', 'hide', 'show', 'on', 'off', etc.
    value?: any;        //Un valor, una funcion, lo que sea
    observer?: any;      //observador para los request/respond
    function?: Function;    //Una funcion a ejecutar directamente, escribir asi -> imprimir.bind(this);
}