using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using app.server.Models;

namespace app.server.Interfaces
{
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string symbol);
    }
}