import { InfoTwoTone } from '@mui/icons-material'
import { Box, Link, Tooltip, Typography } from '@mui/material'
import React from 'react'
import {
  CURRENT_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
  LAST_LOGIN_DATE_LOCALSTORAGE_KEY,
  LAST_LOGIN_METHOD_LOCALSTORAGE_KEY,
  LAST_LOGIN_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
  LAST_LOGIN_SOURCEAPP_URL_LOCALSTORAGE_KEY,
} from '../../utils/SynapseConstants'
import { LoginMethod, getLoginMethodFriendlyName } from './LoginMethod'

export type LastLoginInfoProps = {
  currentSourceAppName: string | null
  lastLoginMethod: LoginMethod | null
  lastLoginSourceAppName: string | null
  lastLoginSourceAppURL: string | null
  lastLoginDate: string | null
  display: 'sentence' | 'box'
}

export function getLastLoginInfo(): Omit<LastLoginInfoProps, 'display'> {
  return {
    currentSourceAppName: localStorage.getItem(
      CURRENT_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
    ),
    lastLoginMethod: localStorage.getItem(
      LAST_LOGIN_METHOD_LOCALSTORAGE_KEY,
    ) as LoginMethod,
    lastLoginSourceAppName: localStorage.getItem(
      LAST_LOGIN_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
    ),
    lastLoginSourceAppURL: localStorage.getItem(
      LAST_LOGIN_SOURCEAPP_URL_LOCALSTORAGE_KEY,
    ),
    lastLoginDate: localStorage.getItem(LAST_LOGIN_DATE_LOCALSTORAGE_KEY),
  }
}

export function setCurrentAppInfo(currentSourceAppName: string) {
  localStorage.setItem(
    CURRENT_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
    currentSourceAppName,
  )
}

export function setLastLoginInfo(
  lastLoginMethod: LoginMethod,
  lastLoginDate: string,
  lastLoginSourceAppName: string,
  lastLoginSourceAppURL: string,
) {
  localStorage.setItem(LAST_LOGIN_DATE_LOCALSTORAGE_KEY, lastLoginDate)
  localStorage.setItem(LAST_LOGIN_METHOD_LOCALSTORAGE_KEY, lastLoginMethod)
  localStorage.setItem(
    LAST_LOGIN_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
    lastLoginSourceAppName,
  )
  localStorage.setItem(
    LAST_LOGIN_SOURCEAPP_URL_LOCALSTORAGE_KEY,
    lastLoginSourceAppURL,
  )
}

export function clearLastLoginInfo() {
  const keys = [
    CURRENT_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
    LAST_LOGIN_METHOD_LOCALSTORAGE_KEY,
    LAST_LOGIN_SOURCEAPP_NAME_LOCALSTORAGE_KEY,
    LAST_LOGIN_SOURCEAPP_URL_LOCALSTORAGE_KEY,
    LAST_LOGIN_DATE_LOCALSTORAGE_KEY,
  ]
  keys.forEach(key => localStorage.removeItem(key))
}

function getSourceAppIndefiniteArticle(val: string) {
  return val.match(/^[aeiou]/i) ? 'an' : 'a'
}

function getSourceAppDefiniteArticle(val: string) {
  return val.match(' Portal$') ? 'the ' : ''
}

export default function LastLoginInfo(props: LastLoginInfoProps) {
  const {
    currentSourceAppName,
    lastLoginMethod,
    lastLoginSourceAppName,
    lastLoginSourceAppURL,
    lastLoginDate,
    display,
  } = props

  const shouldNotShowLastLoginInfo =
    currentSourceAppName === null ||
    lastLoginMethod === null ||
    lastLoginSourceAppName === null ||
    lastLoginSourceAppURL === null ||
    lastLoginDate === null ||
    currentSourceAppName === lastLoginSourceAppName

  if (shouldNotShowLastLoginInfo) {
    return null
  }

  const currentSourceAppIndefiniteArticle =
    getSourceAppIndefiniteArticle(currentSourceAppName)
  const currentSourceAppDefiniteArticle =
    getSourceAppDefiniteArticle(currentSourceAppName)
  const lastLoginSourceAppDefiniteArticle = getSourceAppDefiniteArticle(
    lastLoginSourceAppName,
  )

  const title = `You may already have ${currentSourceAppIndefiniteArticle} ${currentSourceAppName} account`

  const tooltipText = (
    <>
      <Typography variant="smallText2" mb={1}>
        {title}
      </Typography>
      <Typography variant="smallText1" mb={1} color="white">
        {`This computer was used to sign in to an account on ${lastLoginSourceAppDefiniteArticle}${lastLoginSourceAppName}. 
          You can use the same account to sign in to ${currentSourceAppDefiniteArticle}${currentSourceAppName}.`}
      </Typography>
      <Typography variant="smallText1" color="white">
        {`Account last used on ${lastLoginDate}`}
      </Typography>
    </>
  )

  const boxText = (
    <>
      <Typography
        variant="smallText2"
        mb={1}
        sx={{ color: 'grey.900', fontSize: '12px' }}
      >
        {title}
      </Typography>
      <Typography
        variant="smallText1"
        mb={1}
        sx={{ color: 'grey.900', fontSize: '12px' }}
      >
        It looks like you already have an account, last used on{' '}
        {lastLoginSourceAppDefiniteArticle}
        <Link href={lastLoginSourceAppURL}>{lastLoginSourceAppName}</Link>.{' '}
        {`You can use this account to sign in via ${getLoginMethodFriendlyName(
          lastLoginMethod,
        )}.`}
      </Typography>
      <Typography
        variant="smallText1"
        sx={{ color: 'grey.700', fontSize: '10px' }}
      >
        {`Account last used on ${lastLoginDate}`}
      </Typography>
    </>
  )

  return (
    <>
      {display === 'sentence' ? (
        <Typography
          variant="smallText1"
          sx={{ color: 'grey.700', textTransform: 'none' }}
        >
          You may be able to use an existing account
          <Tooltip
            title={tooltipText}
            placement={'top'}
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: '#63676C',
                  '& .MuiTooltip-arrow': {
                    color: '#63676C',
                  },
                },
              },
            }}
          >
            <InfoTwoTone
              sx={{
                color: 'grey.700',
                width: '12px',
                height: '12px',
                ml: '4px',
                verticalAlign: 'middle',
              }}
            />
          </Tooltip>
        </Typography>
      ) : (
        <Box sx={{ backgroundColor: 'grey.100', p: '10px' }}>{boxText}</Box>
      )}
    </>
  )
}
