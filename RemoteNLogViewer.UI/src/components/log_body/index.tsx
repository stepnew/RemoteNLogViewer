/** @jsx jsx */
import React from "react";
import { jsx } from '@emotion/core';
import { Image, ImageFit, Text, List, Separator } from "office-ui-fabric-react";

import LogBodyWrapper, {
  ItemWrapper,
  ItemInfoContent,
  ItemHttpMethod,
  ItemDescription
} from "./style";

import Tag from "../tag";

import bug from "../../assets/bug.png";
import error from "../../assets/error.png";
import trace from "../../assets/trace.png";
import warning from "../../assets/warning.png";
import information from "../../assets/information.png";
import fatal from "../../assets/fatal.png";

interface ILogBodyProps {
  logs: Object[];
}

interface ILogImageProps {
  level: string;
}

interface ILog {
  level: string;
  date: string;
  logger: string;
  appName: string;
  appEnv: string;
  message: string;
  error: string;
  httpMethod: string;
  controllerName: string;
  actionName: string;
  ip: string;
}

interface IHttpVerb {
  verb: string;
}

const HttpVerb: React.FunctionComponent<IHttpVerb> = ({ verb }) => {
  const tags = {
    post: <Tag color="#49cc90">{verb}</Tag>,
    get: <Tag color="#61affe">{verb}</Tag>,
    put: <Tag color="#fca130">{verb}</Tag>,
    delete: <Tag color="#f93e3e">{verb}</Tag>
  };

  return tags[verb.toLowerCase()];
};

const LogImage: React.FunctionComponent<ILogImageProps> = React.memo(
  ({ level }) => {
    const levels = {
      debug: (
        <Image src={bug} width={40} height={40} imageFit={ImageFit.cover} />
      ),
      trace: (
        <Image src={trace} width={40} height={40} imageFit={ImageFit.cover} />
      ),
      error: (
        <Image src={error} width={40} height={40} imageFit={ImageFit.cover} />
      ),
      warn: (
        <Image src={warning} width={40} height={40} imageFit={ImageFit.cover} />
      ),
      info: (
        <Image
          src={information}
          width={40}
          height={40}
          imageFit={ImageFit.cover}
        />
      ),
      fatal: (
        <Image src={fatal} width={40} height={40} imageFit={ImageFit.cover} />
      )
    };

    return levels[level.toLowerCase()];
  }
);

const Item: React.FunctionComponent<ILog> = React.memo(
  ({
    level,
    date,
    logger,
    appName,
    appEnv,
    message,
    error,
    httpMethod,
    controllerName,
    actionName,
    ip
  }) => {
    return (
      <ItemWrapper>
        <LogImage level={level} />
        <ItemInfoContent>
          <ItemDescription>
            <Text variant="xLarge" block>
              {`[${date}] ${logger} / ${appName} / ${appEnv}`}
            </Text>
            <Text>{`${message} ${error}`}</Text>
          </ItemDescription>

          {httpMethod && (
            <ItemHttpMethod>
              {<HttpVerb verb={httpMethod} />}({controllerName}/{actionName}) -
              (IP - {ip})
            </ItemHttpMethod>
          )}
        </ItemInfoContent>
      </ItemWrapper>
    );
  }
);

const LogBody: React.FunctionComponent<ILogBodyProps> = React.memo(
  ({ logs }) => {
    const onRenderCell = (props: ILog) => {
      return (
        <React.Fragment>
          <Item {...props} />
          <Separator css={{ margin: "20px 0"}} />
        </React.Fragment>
      );
    };

    return (
      <LogBodyWrapper>
        <List items={logs} onRenderCell={onRenderCell} />
      </LogBodyWrapper>
    );
  }
);

export default LogBody;
