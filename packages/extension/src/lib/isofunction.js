import { defineProxyService } from '@webext-core/proxy-service';

// 1. Define your service
class IsoFunctionService {
  async fibonacci(number) {
    return number * 2
  }
}
export const [registerIsoFunction, getIsoFunction] = defineProxyService(
  'IsoFunctionService',
  () => new IsoFunctionService(),
);
