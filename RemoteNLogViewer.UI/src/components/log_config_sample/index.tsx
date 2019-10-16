/** @jsx jsx */
import React from "react";
import * as monaco from "monaco-editor";
import { jsx } from "@emotion/core";

const xmlSample = `<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      autoReload="true">

  <extensions>
    <add assembly="NLog.Web.AspNetCore"/>
  </extensions>

  <targets>
    <!-- target for Remote Api call. This piece of code must be in the client log.config. -->
    <target xsi:type='WebService'
            name='ws'
            url='http://localhost:96/api/v1/logs'
            protocol='JsonPost'
            encoding='UTF-8'>
        <parameter name="AccessKey" type="System.String" layout="9960f20b7acb" />
        <parameter name='Level' type='System.String' layout='\${level}'/> 
        <parameter name='Logger' type='System.Object' layout='\${logger}'/> 
        <parameter name='Message' type='System.String' layout='\${message}'/>
        <parameter name='Date' type='System.DateTime' layout='\${date}'/> 
        <parameter name='AppName' type='System.String' layout='\${name}'/>
        <parameter name='AppEnv' type='System.String' layout='\${app - Env}'/> 
        <parameter name='Ip' type='System.String' layout='\${aspnet-Request-IP}'/>
        <parameter name='HttpMethod' type='System.String' layout='\${aspnet-Request-Method}'/> 
        <parameter name='ControllerName' type='System.String' layout='\${aspnet-MVC-Controller}'/>
        <parameter name='ActionName' type='System.String' layout='\${aspnet-MVC-Action}'/> 
        <parameter name='Error' type='System.String' layout='\${exception}'/>
    </target>
  </targets>

  <rules>
    <!-- logger to send WebService information to Api -->
    <logger name='*' minlevel="Trace" writeTo='ws' />
  </rules>
</nlog>`;

const LogConfigSample: React.FunctionComponent = React.memo(() => {
  const editorRef = React.useRef();

  React.useEffect(() => {
    const editor = monaco.editor.create(editorRef.current, {
      language: "xml",
      value: xmlSample,
      minimap: { enabled: false }
    });

    return () => {
      editor.dispose();
    };
  }, []);

  return (
    <div
      id="monaco_editor_ref"
      css={{ width: "900px", height: "700px" }}
      ref={editorRef}
    ></div>
  );
});

export default LogConfigSample;
